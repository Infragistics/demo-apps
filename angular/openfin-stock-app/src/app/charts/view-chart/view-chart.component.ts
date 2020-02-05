import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin
import { OpenfinUtils } from "../../../openfin/OpenfinUtils"

import { Fdc3DataAdapter } from "igniteui-angular-fdc3"; // for working with FDC3 data adapter
import { Fdc3InstrumentList } from "igniteui-angular-fdc3"; // for sending ViewChart with multiple stock symbols
import { Fdc3Instrument } from "igniteui-angular-fdc3"; // for sending ViewChart with single stock symbol
import { Fdc3Message } from "igniteui-angular-fdc3"; // for receiving ViewChart message

// required imports for working with FinancialChart
import { IgxFinancialChartComponent } from "igniteui-angular-charts";
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { FinancialChartType } from "igniteui-angular-charts";
import { FinancialChartYAxisMode } from "igniteui-angular-charts";
import { FinancialChartZoomSliderType } from "igniteui-angular-charts";
import { FinancialChartVolumeType } from "igniteui-angular-charts";

@Component({
    selector: "app-view-chart",
    templateUrl: "./view-chart.component.html",
    styleUrls:  ["./view-chart.component.scss"]
})
export class ViewChartComponent implements AfterViewInit {

    public title = "IG Chart - FDC3 ViewChart";
    public dataSource: any[];
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("chart", { static: true })
    public chart: IgxFinancialChartComponent;

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public selected = "TSLA";

    public viewSingleCharts: any[] = [
        { text: "UBER", symbol: "UBER" },
        { text: "GOOG", symbol: "GOOG" },
        { text: "AMZN", symbol: "AMZN" },
        { text: "NVDA", symbol: "NVDA" },
        { text: "TSLA", symbol: "TSLA" },
    ];
    public viewMultipleCharts: any[] = [
        { text: "TSLA + UBER", symbols: ["TSLA", "UBER"] },
        { text: "AMZN + GOOG", symbols: ["AMZN", "GOOG"] },
    ];

    constructor() {
        document.title = this.title;
    }

    public async InitializeFDC3(): Promise<void> {

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to FDC3 "ViewChart" intent
        this.FDC3adapter.subscribe("ViewChart");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update the FinancialChart
            this.UpdateChart(this.FDC3adapter.stockPrices);

            console.log("openfin received message: \n" + msg.json);

            // Optional access to properties of FDC3 message that can be used
            // for custom processing of FDC3 intent and its context:
            // let intentType: string = msg.intentType;         // FDC3 intent type, e.g. "ViewChart"
            // let contextType: string = msg.contextType;       // FDC3 context type, e.g. "fdc3.instrument"
            // let contextObject: Fdc3Context = msg.context;    // FDC3 context object
            // let contextJson: string = msg.json;              // string representation of FDC3 context object
            // let tickerSymbols: string[] = msg.tickerSymbols; // array of ticker symbol(s) embedded in FDC3 context
            // let tickerNames: string[] = msg.tickerNames;     // array of ticker name(s) embedded in FDC3 context

            const title = "FDC3 " + msg.intentType + " intent";
            let info = "";
            // info += "\n intent: " + msg.intentType;
            info += "\n ticker: " + msg.tickerSymbols.join(", ");
            info += "\n context: " + msg.contextType;
            OpenfinUtils.notify(title, info, "FDC3");
        };

        // optional, initalizing adapter with some popular stocks
        this.FDC3adapter.stockSymbols = ["TSLA"];

        this.UpdateChart(this.FDC3adapter.stockPrices);
    }

    public async ViewChart(item: any) {
        this.selected = item.text;

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.ticker =  item.symbol;
            const app = await fin.Application.getCurrent();
            const target = app.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewChart", context, target);

        } else {
            // by-passing OpenFin service since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = [ item.symbol];

            this.UpdateChart(this.FDC3adapter.stockPrices);
        }
    }

    public async ViewMultiple(item: any) {
        this.selected = item.text;

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3InstrumentList();
            for (const ticker of item.symbols) {
                const instrument = new Fdc3Instrument();
                instrument.ticker = ticker;
                context.instruments.push(instrument);
            }
            const app = await fin.Application.getCurrent();
            const target = app.identity.uuid;
            // sending FDC3 message with multiple instruments as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrumentList("ViewChart", context, target);

        } else {
            // by-passing OpenFin service since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = item.symbols;
            this.UpdateChart(this.FDC3adapter.stockPrices);
        }
    }

    public UpdateChart(stockPrices: any[]) {
        const dataSources: any[] = [];
        const titles = [];
        for (const prices of stockPrices) {
            const stockItems = [];
            let company = "";
            for (const price of prices.toArray()) {
                company = price.company;
                const item = {
                    date: price.date,
                    open: price.open,
                    high: price.high,
                    low: price.low,
                    close: price.close,
                    volume: price.volume
                };
                stockItems.push(item);
            }
            // adding annotations for SeriesTitle
            const symbol = (prices as any).symbol.toString();
            const title = company + " (" + symbol + ")";
            titles.push(title);
            (stockItems as any).__dataIntents = {
                close: ["SeriesTitle/" + title]
            };

            dataSources.push(stockItems);
        }

        if (this.chart === undefined) { return; }

        // bind and show only OHLC values in the chart
        this.chart.includedProperties = ["*.open", "*.high", "*.low", "*.close", "*.volume", "*.date"];
        this.chart.dataSource = dataSources;

        if (dataSources.length > 1) {
            this.chart.yAxisMode = FinancialChartYAxisMode.PercentChange;
            this.chart.chartType = FinancialChartType.Line;
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Line;
            this.chart.volumeType = FinancialChartVolumeType.None;
            this.chart.subtitle = titles.join(" vs ");
        } else {
            this.chart.yAxisMode = FinancialChartYAxisMode.Numeric;
            this.chart.chartType = FinancialChartType.Bar;
            this.chart.zoomSliderType = FinancialChartZoomSliderType.Bar;
            this.chart.volumeType = FinancialChartVolumeType.None;
            this.chart.subtitle = titles.join(" ");
        }
    }

    public ngAfterViewInit(): void {
        console.log("app view loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: #119dfa");

        if (!window.hasOwnProperty("fin")) {
            console.log("openfin is undefined");
        }

        this.InitializeFDC3();
    }

    public drawerToggle(): void {
        // this.drawer.width = "180px";
        this.drawer.pin = true;
        this.drawer.toggle();
    }

}
