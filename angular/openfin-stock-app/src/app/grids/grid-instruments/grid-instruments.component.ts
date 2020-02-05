import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin
import { OpenfinUtils } from "../../../openfin/OpenfinUtils"

import { Fdc3DataAdapter } from "igniteui-angular-fdc3"; // for working with FDC3 data adapter
import { Fdc3Instrument } from "igniteui-angular-fdc3"; // for sending ViewChart with single stock symbol
import { Fdc3Message } from "igniteui-angular-fdc3"; // for receiving ViewChart message

// required imports for working with IgxGridComponent
import { SortingDirection  } from "igniteui-angular";
import { IgxGridComponent  } from "igniteui-angular";
import { IgxNavigationDrawerComponent } from "igniteui-angular";

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

            // console.log("FDC3 received message: \n" + msg.json);
            // console.log("FDC3 stockPrices: \n" + this.FDC3adapter.stockPrices[0].symbol);

            this.UpdateGrid(this.FDC3adapter.stockPrices);

            const title = "FDC3 " + msg.intentType + " intent";
            let info = "";
            // info += "\n intent: " + msg.intentType;
            info += "\n ticker: " + msg.tickerSymbols.join(", ");
            info += "\n context: " + msg.contextType;
            OpenfinUtils.notify(title, info, "FDC3");
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

                if (items.length > 500) { break; }
            }

            dataSource.push(items);
        }

        if (this.grid === undefined) { return; }

        this.grid.data = dataSource[0];
        this.grid.reflow();
    }

    public ngAfterViewInit(): void {
        console.log("app view loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: yellowgreen");

        if (!window.hasOwnProperty("fin")) {
            console.log("openfin is undefined");
        }

        this.InitializeFDC3();

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
