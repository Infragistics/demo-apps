import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin

import { Fdc3DataAdapter } from "igniteui-angular-fdc3"; // for working with FDC3 data adapter
import { Fdc3Position } from "igniteui-angular-fdc3"; // for sending ViewChart with single stock symbol
import { Fdc3Instrument } from "igniteui-angular-fdc3";
import { Fdc3Message } from "igniteui-angular-fdc3"; // for receiving ViewChart message

@Component({
    selector: "app-explorer-actions",
    templateUrl: "./explorer-actions.component.html",
    styleUrls: ["./explorer-actions.component.scss"]
})
export class ExplorerActionsComponent implements AfterViewInit {
    title = "IG Explorer with FDC3 Intent Subscriptions";
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("messageHistory", { static: true })
    public messageHistory: ElementRef;
    public messageCount = 0;
    public stockItems: any[] = [
        { text: "TSLA", symbol: "TSLA" },
        { text: "UBER", symbol: "UBER" },
        { text: "GOOG", symbol: "GOOG" },
    ];
    public sectorNames: string[] = [
        // "Transportation",
        "Technology",
        "Financial",
        "All"
    ];
    public CurrentApp: any;

    constructor() {
        document.title = this.title;
    }

    public ngAfterViewInit(): void {
        console.log("explorer loaded");

        this.InitializeFDC3();
    }

    public async InitializeFDC3(): Promise<void> {

        if (window.hasOwnProperty("fin")) {
            this.CurrentApp = await fin.Application.getCurrent();
        }

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 intents
        this.FDC3adapter.subscribe("ViewChart");      // used in IG Chart with FDC3 ViewChart window
        this.FDC3adapter.subscribe("ViewInstrument"); // used in IG Grid with FDC3 ViewInstrument window
        this.FDC3adapter.subscribe("ViewPosition");   // used in IG Grid with FDC3 ViewPosition window
        this.FDC3adapter.subscribe("ViewPortfolio");  // used in IG Grid with FDC3 ViewPosition window
        this.FDC3adapter.subscribe("ViewSector");  // used in IG Treemap with FDC3 ViewSector window

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {

            let info = ""; // this.messageHistory.nativeElement.textContent;
            info = info + "============================\n";
            info = info + "FDC3 message #" + ++this.messageCount + ":" + "\n";
            info = info + "intent: " + msg.intentType + "\n";
            info = info + "json: \n" + msg.json;
            const old = this.messageHistory.nativeElement.textContent;
            this.messageHistory.nativeElement.textContent = info + old;
        };
    }

    public ClearHistory() {
        this.messageCount = 0;
        this.messageHistory.nativeElement.textContent = "";
    }

    public async ViewChart(symbol: string) {

        if (!window.hasOwnProperty("fin")) {
            this.ReportOpenFinIsMissing();
        } else {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker = symbol;
            // const app = await fin.Application.getCurrent();
            const target = this.CurrentApp.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewChart", context, target);
        }
    }
    public async ViewSector(name: string) {

        if (!window.hasOwnProperty("fin")) {
            this.ReportOpenFinIsMissing();
        } else {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.name = name;
            // const app = await fin.Application.getCurrent();
            const target = this.CurrentApp.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewSector", context, target);
        }
    }

    public async ViewInstrument(symbol: string) {

        if (!window.hasOwnProperty("fin")) {
            this.ReportOpenFinIsMissing();
        } else {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker = symbol;
            // const app = await fin.Application.getCurrent();
            const target = this.CurrentApp.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewInstrument", context, target);
        }
    }

    public async ViewPosition(symbol: string) {

        if (!window.hasOwnProperty("fin")) {
            this.ReportOpenFinIsMissing();
        } else {
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

            // const app = await fin.Application.getCurrent();
            const target = this.CurrentApp.identity.uuid;
            // sending FDC3 message with position as context to IG Stock Dashboard app app
            this.FDC3adapter.sendPosition("ViewPosition", context, target);
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

    public ReportOpenFinIsMissing(): void {
        let info = ""; // this.messageHistory.nativeElement.textContent;
        info = info + "============================\n";
        info = info + "Warning: Cannot find OpenFin FDC3 Service \n";
        info = info + "You need to run this application using OpenFin launcher \n";
        const old = this.messageHistory.nativeElement.textContent;
        this.messageHistory.nativeElement.textContent = info + old;
    }

}
