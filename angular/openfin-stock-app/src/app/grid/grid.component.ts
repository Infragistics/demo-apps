import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";

// required imports for working with FDC3 data adapter:
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
// for sending ViewChart with single stock symbol:
import { Fdc3Instrument } from "igniteui-angular-fdc3";
// for sending ViewChart with multiple stock symbols:
import { Fdc3InstrumentList } from "igniteui-angular-fdc3";
// for receiving ViewChart message:
import { Fdc3Message } from "igniteui-angular-fdc3";

// required imports for working with IgxGridComponent
import { IgxGridComponent  } from "igniteui-angular";
import { IgxNavigationDrawerComponent } from "igniteui-angular";

// optional imports for overriding auto-generated data by FDC3 data adapter
import { StockPricePoint } from "igniteui-angular-core";
import { StockPriceHistory } from "igniteui-angular-core";

@Component({
    selector: "app-root",
    templateUrl: "./grid.component.html",
    styleUrls:  ["./grid.component.scss"]
})
export class GridComponent implements AfterViewInit {

    public title = "Openfin-FDC3 - Grid App";
    public dataSource: any[];
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("grid", { static: true })
    public grid: IgxGridComponent;

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public selected = "TSLA";

    public viewInstrumentItems: any[] = [
        { text: "TSLA", symbol: "TSLA" },
        { text: "UBER", symbol: "UBER" },
        { text: "GOOG", symbol: "GOOG" },
        { text: "AMZN", symbol: "AMZN" },
        { text: "NVDA", symbol: "NVDA" },
    ];
    constructor() {
        document.title = this.title;
    }

    public async InitializeFDC3(): Promise<void> {

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 "ViewInstrument" intent
        this.FDC3adapter.subscribe("ViewInstrument");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update the grid
            this.UpdateGrid(this.FDC3adapter.stockPrices);

            console.log("message received: \n" + msg.json);

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
        this.FDC3adapter.stockSymbols = ["TSLA"];

        this.UpdateGrid(this.FDC3adapter.stockPrices);
    }

    public ViewInstrument(symbol: string): void {

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker = symbol;
            // sending FDC3 message with instrument as context to IgStockCharts app
            this.FDC3adapter.sendInstrument("ViewInstrument", context, "IgStockDashboardAppID");

        } else {
            // by-passing OpenFin service since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = [symbol];

            this.UpdateGrid(this.FDC3adapter.stockPrices);
        }
    }

    public UpdateGrid(stockPrices: any[]) {
        const dataSource: any[] = [];

        for (const prices of stockPrices) {
            const symbol = (prices as any).symbol.toString();
            this.selected = symbol;
            const items = [];
            let index = 0;
            for (const price of prices.toArray()) {
                const date = (price.date as Date);
                const day  = date.toLocaleDateString();
                const time = date.toLocaleTimeString();
                const item = {
                    ID: ++index,
                    Symbol: symbol,
                    Date: date,
                    Time: day + " " + time,
                    Open: price.open,
                    High: price.high,
                    Low: price.low,
                    Close: price.close,
                    Volume: price.volume
                };
                items.push(item);

                if (items.length > 1000) { break; }
            }
            console.log("items.length " + items.length);
            dataSource.push(items);
        }
        console.log("stock.length " + dataSource.length);

        if (this.grid === undefined) { return; }

        this.grid.data = dataSource[0];
    }

    public ngAfterViewInit(): void {
        console.log("app loaded");

        this.drawer.width = "240px";

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

}
