import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";

// required imports for working with FDC3 data adapter:
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";

// for sending ViewChart with single/multiple stock positions:
import { Fdc3Position } from "igniteui-angular-fdc3";
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

    public title = "IG Grid - FDC3 ViewPosition";
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
        { symbol: "NVDA" },
        { symbol: "FB"   },
        { symbol: "GM"   },
    ];

    constructor() {
        document.title = this.title;
    }

    public async InitializeFDC3(): Promise<void> {

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 "ViewPosition" and "ViewPortfolio" intents
        this.FDC3adapter.subscribe("ViewInstrument");
        this.FDC3adapter.subscribe("ViewPosition");
        // this.FDC3adapter.subscribe("ViewPortfolio");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update the grid

            console.log("FDC3 received message: \n" + msg.json);

            if (this.FDC3adapter.stockPositions.length === 0) {
                return;
            }


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

            // if (this.FDC3adapter.stockPositions.length > 0) {
            //     const count = this.FDC3adapter.stockPositions.length;
            //     const position = this.FDC3adapter.stockPositions[count - 1];

            //     console.log("FDC3 stockPosition: \n" + position.symbol);
            //     console.log("FDC3 stockPosition: costTotal \n" + position.costTotal);
            //     console.log("FDC3 stockPosition: costPerShare \n" + position.costPerShare);
            //     console.log("FDC3 stockPosition: marketPrice \n" + position.marketPrice);
            //     console.log("FDC3 stockPosition: marketValue \n" + position.marketValue);
            // }
        };

        // optional, initalizing adapter with some popular stocks
        this.FDC3adapter.stockSymbols = [];

        if (this.grid === undefined) { return; }
        console.log("openfin app binding grid");

        this.grid.data = this.FDC3adapter.stockPositions;
    }

    public ViewPosition(symbol: string): void {

        if (window.hasOwnProperty("fin")) {
            const instrument = new Fdc3Instrument();
            instrument.ticker = symbol;

            const details = this.GetStockDetails(symbol);
            // creating context for FDC3 message
            const context = new Fdc3Position();
            context.instrument = instrument;
            context.shares = 100;
            context.price = details.marketPrice;
            context.cost = details.marketPrice - (Math.random() * 5);
            // tslint:disable-next-line:no-string-literal
            context.id["sector"] = details.sector;

            // sending FDC3 message with position as context to IgStockCharts app
            this.FDC3adapter.sendPosition("ViewPosition", context, "IgStockDashboardAppID");

        } else {
            // by-passing OpenFin service since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = [symbol];
        }
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

        this.grid.groupingExpressions = [
            // { fieldName: "sector", dir: SortingDirection.Desc },
            { fieldName: "symbol", dir: SortingDirection.Desc }
        ];
    }

    public drawerToggle(): void {
        // this.drawer.width = "180px";
        this.drawer.pin = true;
        this.drawer.toggle();
    }

    public SellPositions(): void {
        this.FDC3adapter.stockSymbols = [];
        this.FDC3adapter.stockPositions = [];
        this.grid.data = this.FDC3adapter.stockPositions;
        this.grid.reflow();
    }
}
