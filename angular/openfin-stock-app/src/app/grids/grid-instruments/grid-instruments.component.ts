import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin

// required imports for working with FDC3 data adapter:
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
// for sending ViewChart with single/multiple stock symbols:
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
    templateUrl: "./grid-instruments.component.html",
    styleUrls:  ["./grid-instruments.component.scss"]
})
export class GridInstrumentsComponent implements AfterViewInit {

    public title = "IG Grid - FDC3 ViewInstrument";
    public dataSource: any[];
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("grid", { static: true })
    public grid: IgxGridComponent;

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public selected = "GOOG";

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

        // handling FDC3 intents sent via OpenFin"s FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update the grid

            console.log("FDC3 received message: \n" + msg.json);
            console.log("FDC3 stockPrices: \n" + this.FDC3adapter.stockPrices[0].symbol);

            this.UpdateGrid(this.FDC3adapter.stockPrices);

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
        this.FDC3adapter.stockSymbols = ["GOOG"];

        this.UpdateGrid(this.FDC3adapter.stockPrices);
    }

    public async ViewInstrument(symbol: string) {

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker = symbol;
            const app = await fin.Application.getCurrent();
            const target = app.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewInstrument", context, target);

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
                const month = "0" + date.getMonth() + " (" + date.toLocaleString("default", { month: "long" }) + ")";
                const item = {
                    ID: ++index,
                    Symbol: price.symbol,
                    Name: price.company,
                    Year: date.getFullYear().toString(),
                    Month: month,
                    Date: day,
                    Time: time,
                    Close: price.close,
                };
                items.push(item);

                if (items.length > 2500) { break; }
            }
            console.log("items.length " + items.length);
            dataSource.push(items);
        }

        if (this.grid === undefined) { return; }

        this.grid.data = dataSource[0];
        this.grid.reflow();
    }

    public ngAfterViewInit(): void {
        console.log("openfin app loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: yellowgreen");

        if (window.hasOwnProperty("fin")) {
            this.InitializeFDC3();
        } else {
            console.log("openfin FDC3 is undefined");
        }

        // this.grid.groupingExpressions = [
        //     { fieldName: "Month", dir: SortingDirection.Desc },
        //     { fieldName: "Date", dir: SortingDirection.Desc }
        // ];
    }

    public drawerToggle(): void {
        // this.drawer.width = "180px";
        this.drawer.pin = true;
        this.drawer.toggle();
    }

}
