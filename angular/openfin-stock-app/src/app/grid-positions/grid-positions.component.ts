import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";

// required imports for working with FDC3 data adapter:
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";

// for sending ViewChart with single/multiple stock positions:
import { Fdc3Position } from "igniteui-angular-fdc3";
import { Fdc3Portfolio } from "igniteui-angular-fdc3";
import { Fdc3Instrument } from "igniteui-angular-fdc3";
// for receiving ViewChart message:
import { Fdc3Message } from "igniteui-angular-fdc3";

// required imports for working with IgxGridComponent
import { SortingDirection  } from "igniteui-angular";
import { IgxGridComponent  } from "igniteui-angular";
import { IgxNavigationDrawerComponent } from "igniteui-angular";

// optional imports for overriding auto-generated data by FDC3 data adapter
import { StockPricePoint } from "igniteui-angular-core";
import { StockPriceHistory } from "igniteui-angular-core";

@Component({
    selector: "app-root",
    templateUrl: "./grid-positions.component.html",
    styleUrls:  ["./grid-positions.component.scss"]
})
export class GridPositionsComponent implements AfterViewInit {

    public title = "IG Grid - FDC3 ViewPosition & ViewPortfolio";
    public dataSource: any[];
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("grid", { static: true })
    public grid: IgxGridComponent;

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public selected = "TSLA";

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

            console.log("FDC3 received message: \n" + msg.json);

            // if (this.FDC3adapter.stockPositions.length === 0) {
            //     return;
            // }

            if (this.grid !== undefined) {
                this.grid.data = this.FDC3adapter.stockPositions;
                this.grid.reflow();
            }

            // Optional access to properties of FDC3 message that can be used
            // for custom processing of FDC3 intent and its context:
            // let intentType: string = msg.intentType;         // FDC3 intent type, e.g. "ViewChart"
            // let contextType: string = msg.contextType;       // FDC3 context type, e.g. "fdc3.instrument"
            // let contextObject: Fdc3Context = msg.context;    // FDC3 context object
            // let contextJson: string = msg.json;              // string representation of FDC3 context object
            // let tickerSymbols: string[] = msg.tickerSymbols; // array of ticker symbol(s) embedded in FDC3 context
            // let tickerNames: string[] = msg.tickerNames;     // array of ticker name(s) embedded in FDC3 context
        };

        // optional, initalizing adapter with some popular stocks
        this.FDC3adapter.stockSymbols = [];

        if (this.grid === undefined) { return; }
        console.log("openfin app binding grid");

        this.grid.data = this.FDC3adapter.stockPositions;
    }

    // using ViewPosition intent to buy stock positions with a given stock symbol/ticker
    public ViewPosition(symbol: string): void {

        const instrument = new Fdc3Instrument();
        instrument.ticker = symbol;

        const details = this.GetStockDetails(symbol);
        // creating context for FDC3 message
        const position = new Fdc3Position();
        position.instrument = instrument;
        // optional setting properties for purchase order:
        position.shares = 100;
        position.price = details.marketPrice;
        position.cost = details.marketPrice - (Math.random() * 15);

        // sending FDC3 message with position as context to IG Stock Dashboard app app
        this.FDC3adapter.sendPosition("ViewPosition", position, "IgStockDashboardAppID");

        this.grid.groupingExpressions = [
            { fieldName: "sector", dir: SortingDirection.Desc },
            // { fieldName: "symbol", dir: SortingDirection.Desc }
        ];
    }

    // using ViewPortfolio intent to show stock positions in a given market sector
    public ViewPortfolio(sector: string): void {

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

        // sending FDC3 message with portfolio as context to IG Stock Dashboard app app
        this.FDC3adapter.sendPortfolio("ViewPortfolio", portfolio, "IgStockDashboardAppID");

        this.grid.groupingExpressions = [
            { fieldName: "sector", dir: SortingDirection.Desc },
            // { fieldName: "symbol", dir: SortingDirection.Desc }
        ];
    }

    public GetStockDetails(stockSymbol: string) {

        for (const stock of this.FDC3adapter.stockDetails) {
            if (stock.symbol === stockSymbol) {
                return stock;
            }
        }
        return this.FDC3adapter.stockDetails[0];
    }

    public ngAfterViewInit(): void {
        console.log("openfin app loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: orange");

        if (openfinFdc3 === undefined) {
            console.log("openfinFdc3 is undefined"); return;
        } else {
            this.InitializeFDC3();
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
        this.grid.data = this.FDC3adapter.stockPositions;
    }
}
