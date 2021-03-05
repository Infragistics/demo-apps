import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin
import { OpenfinUtils } from "../../../openfin/OpenfinUtils"

import { Fdc3DataAdapter } from "igniteui-angular-fdc3"; // for working with FDC3 data adapter
import { Fdc3Position } from "igniteui-angular-fdc3";    // for sending ViewPosition with single stock position
import { Fdc3Portfolio } from "igniteui-angular-fdc3";   // for sending ViewPortfolio with multiple stock positions
import { Fdc3Instrument } from "igniteui-angular-fdc3";  // for defining context of FDC3 message
import { Fdc3Message } from "igniteui-angular-fdc3";     // for receiving FDC3 message
import { StockPosition } from "igniteui-angular-core";

// required imports for working with IgxGridComponent
import { SortingDirection } from "igniteui-angular";
import { IgxGridComponent } from "igniteui-angular";
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { DisplayDensity, ISelectionEventArgs } from "igniteui-angular";

@Component({
    selector: "app-root",
    templateUrl: "./grid-positions.component.html",
    styleUrls:  ["./grid-positions.component.scss"]
})
export class GridPositionsComponent implements AfterViewInit {

    public title = "Grid - FDC3 ViewPosition"; // & ViewPortfolio
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("grid", { read: IgxGridComponent, static: true })
    public grid: IgxGridComponent;

    public dataSource: StockPosition[];

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public darkTheme: boolean = false;
    public densityOptions = [DisplayDensity.compact, DisplayDensity.cosy, DisplayDensity.comfortable];
    public densitySelected = DisplayDensity.comfortable;

    public viewPositionItems: any[] = [
        { symbol: "TSLA" },
        { symbol: "UBER" },
        { symbol: "GOOG" },
        { symbol: "AMZN" },
    ];

    public viewPortfolioItems: any[] = [
        { sector: "Technology" },
        { sector: "Transportation" },
        { sector: "Communication" },
        { sector: "Financial" },
        { sector: "Industrial" },
        { sector: "Materials" },
        { sector: "Energy" },
    ];

    constructor() {
        document.title = this.title;
    }

    public async InitializeFDC3(): Promise<void> {

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 intents
        this.FDC3adapter.subscribe("ViewInstrument");
        this.FDC3adapter.subscribe("ViewPosition");  // used to buy positions with passed symbol
        this.FDC3adapter.subscribe("ViewPortfolio"); // used to sell positions with passed sector

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update the grid

            // console.log("FDC3 received message: \n" + msg.json);

            if (this.grid !== undefined) {
                this.dataSource = this.FDC3adapter.stockPositions;
                this.grid.groupingExpressions = [
                    { fieldName: "sector", dir: SortingDirection.Desc }
                ];
                this.grid.reflow();
            }

            const title = "FDC3 " + msg.intentType + " intent";
            let info = "";
            info += "\n ticker: " + msg.tickerSymbols.join(", ");
            info += "\n context: " + msg.contextType;
            OpenfinUtils.notify(title, info, "FDC3");
        };

        // optional, initalizing adapter with some popular stocks
        // this.FDC3adapter.stockPositions = [];
    }

    // using ViewPosition intent to buy stock positions with a given stock symbol/ticker
    public async ViewPosition(symbol: string) {

        const details = this.GetStockDetails(symbol);

        if (window.hasOwnProperty("fin")) {
            const instrument = new Fdc3Instrument();
            instrument.ticker = symbol;

            // creating context for FDC3 message
            const position = new Fdc3Position();
            position.instrument = instrument;
            // optional setting properties for purchase order:
            position.shares = 100;
            position.price = details.marketPrice;
            position.cost = details.marketPrice - (Math.random() * 15);

            const app = await fin.Application.getCurrent();
            const target = app.identity.uuid;
            // sending FDC3 message with position as context to IG Stock Dashboard app app
            this.FDC3adapter.sendPosition("ViewPosition", position, target);

        } else {
            // OpenFin is offline so we are adding dummy data
            this.AddStockPosition(symbol, true);
        }
    }

    // using ViewPortfolio intent to show stock positions in a given market sector
    public async ViewPortfolio(sector: string) {

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const portfolio = new Fdc3Portfolio();
            for (const stock of this.FDC3adapter.stockDetails) {
                if (stock.sector === sector && portfolio.positions.length < 5) {
                    const instrument = new Fdc3Instrument();
                    instrument.ticker = stock.symbol;

                    const position = new Fdc3Position();
                    position.instrument = instrument;
                    position.shares = 100;
                    position.price = stock.marketPrice;
                    position.cost = stock.marketPrice - (Math.random() * 15);

                    portfolio.positions.push(position);
                }
            }
            const app = await fin.Application.getCurrent();
            const target = app.identity.uuid;
            // sending FDC3 message with portfolio as context to IG Stock Dashboard app app
            this.FDC3adapter.sendPortfolio("ViewPortfolio", portfolio, target);

        } else {
            // OpenFin is offline so we are adding dummy data
            this.dataSource = [];
            for (const stock of this.FDC3adapter.stockDetails) {
                if (stock.sector === sector && this.dataSource.length < 5) {
                    this.AddStockPosition(stock.symbol, false);
                }
            }
            this.grid.reflow();
        }
    }

    public GetStockDetails(stockSymbol: string): any {

        for (const stock of this.FDC3adapter.stockDetails) {
            if (stock.symbol === stockSymbol) {
                return stock;
            }
        }
        return this.FDC3adapter.stockDetails[0];
    }

    public AddStockPosition(symbol: string, updateGrid: boolean) {

        const details = this.GetStockDetails(symbol);
        const position = new StockPosition();
        position.company = symbol;
        position.symbol = symbol;
        position.shares = 100; // + Math.ceil(Math.random() * 10);
        position.marketPrice = Math.ceil(details.marketPrice);
        position.costPerShare = Math.ceil(details.marketPrice - (Math.random() * 5));
        position.sector = details.sector;
        this.dataSource.push(position);

        if (this.grid !== undefined && updateGrid) {
            this.grid.reflow();
            this.grid.groupingExpressions = [
                { fieldName: "sector", dir: SortingDirection.Desc }
            ];
        }
    }

    public ngAfterViewInit(): void {
        console.log("app view loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: orange");

        this.dataSource = [];
        this.InitializeFDC3();

        // initalizing data to some default stock positions
        this.AddStockPosition("TSLA", false);
        this.AddStockPosition("AMZN", false);
        this.AddStockPosition("UBER", false);
        this.AddStockPosition("GOOG", false);
        this.AddStockPosition("APPL", false);

        if (!window.hasOwnProperty("fin")) {
            console.log("OpenFin is offline");
        } else {
            this.FDC3adapter.stockPositions = this.dataSource;
        }

        if (this.grid !== undefined) {
            this.grid.reflow();
            this.grid.groupingExpressions = [
                { fieldName: "sector", dir: SortingDirection.Desc }
            ];
        }
    }

    public drawerToggle(): void {
        // this.drawer.width = "180px";
        this.drawer.pin = true;
        this.drawer.toggle();
    }

    public ClearPositions(): void {

        for (let i = this.FDC3adapter.stockPositions.length - 1; i >= 0; i--) {
            this.FDC3adapter.removeStockPosition(i);
        }
        this.dataSource = this.FDC3adapter.stockPositions;
        // this.grid.data = this.FDC3adapter.stockPositions;
    }

    public themeChange() {
        this.darkTheme = !this.darkTheme;
    }

    public onDensityChange(event: ISelectionEventArgs) {
        this.densitySelected = event.newSelection.value;
    }

}
