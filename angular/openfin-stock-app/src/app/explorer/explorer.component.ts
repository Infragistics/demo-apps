import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

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

@Component({
    selector: "app-root",
    templateUrl: "./explorer.component.html",
    styleUrls: ["./explorer.component.scss"]
})
export class ExplorerComponent implements AfterViewInit {
    title = "Openfin-FDC3 Explorer";
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("messageHistory", { static: true })
    public messageHistory: ElementRef;
    public messageCount = 1;

    public viewChartItems: any[] = [
        { text: "TSLA", symbol: "TSLA" },
        { text: "UBER", symbol: "UBER" },
        { text: "GOOG", symbol: "GOOG" },
        { text: "AMZN", symbol: "AMZN" },
        { text: "NVDA", symbol: "NVDA" },
    ];
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

    public ngAfterViewInit(): void {
        // enabling animation duration (in milliseconds)
        // this.bulletGraph.transitionDuration = 500;
        console.log("explorer loaded");

        this.InitializeFDC3();
    }

    public SendInstrument(): void {
    }

    public InitializeFDC3(): void {

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 "ViewChart" and "ViewInstrument" intents
        this.FDC3adapter.subscribe("ViewChart");
        this.FDC3adapter.subscribe("ViewInstrument");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {

            let info = ""; // this.messageHistory.nativeElement.textContent;
            info = info + "======================================\n";
            info = info + "FDC3 message #" + ++this.messageCount + ":" + "\n";
            info = info + "intent: " + msg.intentType + "\n";
            info = info + "json: \n" + msg.json;
            const old = this.messageHistory.nativeElement.textContent;
            this.messageHistory.nativeElement.textContent = info + old;
        };
    }

    public ViewChart(symbol: string): void {
        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker = symbol;
            // sending FDC3 message with instrument as context to IgStockCharts app
            this.FDC3adapter.sendInstrument("ViewChart", context, "IgStockDashboardAppID");

        } else {
            // by-passing OpenFin service since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = [symbol];
        }
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
        }
    }

    // public ViewInstruments(symbols: string[]): void {
    //     // const symbols: string[] = ["MSFT", "TSLA"];

    //     if (window.hasOwnProperty("fin")) {
    //         // creating context for FDC3 message
    //         const context = new Fdc3InstrumentList();
    //         for (const ticker of symbols) {
    //             const instrument = new Fdc3Instrument();
    //             instrument.ticker = ticker;
    //             context.instruments.push(instrument);
    //         }
    //         // sending FDC3 message with multiple instruments as context to IgStockCharts app
    //         this.FDC3adapter.sendInstrumentList("ViewInstrument", context, "IgStockDashboardAppID");

    //     } else {
    //         // by-passing OpenFin service since it is not running
    //         this.FDC3adapter.clearData();
    //         this.FDC3adapter.stockSymbols = symbols;
    //     }
    // }

}
