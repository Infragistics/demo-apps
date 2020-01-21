import React from 'react';
import WinActions from './WinActions';

// optional imports for overriding auto-generated data
import { StockPricePoint } from 'igniteui-react-core/ES5/StockPricePoint';
import { StockPriceHistory } from 'igniteui-react-core/ES5/StockPriceHistory';

// required imports for working with FDC3 data adapter
import { Fdc3DataAdapter } from "igniteui-react-fdc3/ES5/Fdc3DataAdapter"
import { Fdc3Message } from 'igniteui-react-fdc3/ES5/Fdc3Message';
import { Fdc3Context } from 'igniteui-react-fdc3/ES5/Fdc3Context';
import { Fdc3Instrument } from 'igniteui-react-fdc3/ES5/Fdc3Instrument';
import { Fdc3InstrumentList } from 'igniteui-react-fdc3/ES5/Fdc3InstrumentList';

// required imports for working with FinancialChart
import { IgrFinancialChart } from "igniteui-react-charts/ES5/igr-financial-chart";
import { IgrFinancialChartModule } from "igniteui-react-charts/ES5/igr-financial-chart-module";

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";

IgrFinancialChartModule.register();

export default class Fdc3ChartWindow extends React.Component<any, any> {

    public chart: IgrFinancialChart;

    public FDC3adapter: Fdc3DataAdapter;

    constructor(props: any) {
        super(props);

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // optional, initalizing adapter with some popular stock
        this.FDC3adapter.stockSymbols = ["TSLA"];

        // subscribing to FDC3 "ViewChart" intent
        this.FDC3adapter.subscribe("ViewChart");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // and generated data for tickers embedded in context of FDC3 message
            // so we can just update dataSources state that is bound to the FinancialChart
            this.setState({ dataSources: this.FDC3adapter.stockPrices });

            // Optional access to properties of FDC3 message that can be used
            // for custom processing of FDC3 intent and its context:
            let intentType: string = msg.intentType;      // FDC3 intent type, e.g. "ViewChart"
            let contextType: string = msg.contextType;    // FDC3 context type, e.g. "fdc3.instrument"
            let contextObject: Fdc3Context = msg.context; // FDC3 context object
            let contextJson: string = msg.json;           // string representation of FDC3 context object
            let tickerSymbols: string[] = msg.tickerSymbols; // array of ticker symbol(s) embedded in FDC3 context
            let tickerNames: string[] = msg.tickerNames;     // array of ticker name(s) embedded in FDC3 context
        };

        // Optional, handling event for populating stock prices with real data instead of using default data which is auto-generated
        // this.FDC3adapter.populateStockPrices = (symbol) => {
        //     let stockPrices = new StockPriceHistory();
        //     stockPrices.symbol = symbol;
        //     let points = 2 * 24 * 60;
        //     let value = 200;
        //     let dateInterval = 10;
        //     let date = this.addMinutes(new Date(), -points * dateInterval);
        //     for (let i = 0; i < points; i++) {
        //         const price = new StockPricePoint();
        //         price.symbol = symbol;
        //         price.date = date;
        //         price.open = Math.round(value);
        //         price.high = Math.round(price.open + (Math.random() * 5));
        //         price.low  = Math.round(price.open - (Math.random() * 5));
        //         price.close = Math.round(price.low + (Math.random() * (price.high - price.low)));
        //         price.volume = Math.round(price.open * (Math.random() + 1.1) * 1000);
        //         stockPrices.add(price);
        //         date = this.addMinutes(date, dateInterval);
        //         value += ((Math.random() - 0.5) * 5);
        //     }
        //     return stockPrices;
        // };

        this.chartRef = this.chartRef.bind(this);
        this.chartClearClick = this.chartClearClick.bind(this);
        this.viewChartClick = this.viewChartClick.bind(this);
        this.viewMultipleClick = this.viewMultipleClick.bind(this);

        this.state = { dataSources: this.FDC3adapter.stockPrices };
    }

    viewChartClick(e: any, symbol: string) {
        // checking if OpenFin is running
        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            let context = new Fdc3Instrument();
            context.ticker = symbol;
            // sending FDC3 message with instrument as context to IgStockCharts app
            this.FDC3adapter.sendInstrument("ViewChart", context, "IgStockCharts");

        } else {
            // by-passing OpenFin since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = [symbol];
            this.setState({ dataSources: this.FDC3adapter.stockPrices });
        }
    }

    viewMultipleClick(e: any) {
        var tickers: string[] = ["MSFT", "FB"];

        // checking if OpenFin is running
        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            let context = new Fdc3InstrumentList();
            for (const ticker of tickers) {
                let instrument = new Fdc3Instrument();
                instrument.ticker = ticker;
                context.instruments.push(instrument);
            }
            // sending FDC3 message with multiple instruments as context to IgStockCharts app
            this.FDC3adapter.sendInstrumentList("ViewChart", context, "IgStockCharts");

        } else {
            // by-passing OpenFin since it is not running
            this.FDC3adapter.clearData();
            this.FDC3adapter.stockSymbols = tickers;
            this.setState({ dataSources: this.FDC3adapter.stockPrices });
        }
    }

    render() {
        return (
            <div className="chartWindow" >
                <div className="chartContainer">

                    <IgrFinancialChart
                    ref={this.chartRef} width="100%" height="100%"
                    chartType="Bar" zoomSliderType="Line"
                    isWindowSyncedToVisibleRange={true}
                    isLegendVisible={false}

                    // binding FinancialChart to state
                    dataSource={this.state.dataSources}
                    includedProperties={this.dataProperties}
                    />
                </div>

                <div className="buttonContainer" style={{ marginLeft: "1rem"}} >
                    <div className="buttonViewStocks" onClick={(e) => this.viewChartClick(e, "FB")}>View Chart (FB)</div>
                    <div className="buttonViewStocks" onClick={(e) => this.viewChartClick(e, "TSLA")}>View Chart (TSLA)</div>
                    <div className="buttonViewStocks" onClick={(e) => this.viewChartClick(e, "UBER")}>View Chart (UBER)</div>
                    <div className="buttonViewMultiple" onClick={this.viewMultipleClick}>View Chart (Multiple)</div>

                    <div className="buttonClearEvents" onClick={this.chartClearClick}>Clear Chart</div>
                </div>

                {!window.hasOwnProperty("fin") &&
                <div className="openfinNote" >
                    Note you need to run this app from <a target="_blank" href="https://github.com/Infragistics/demo-apps/tree/master/react/open-fin-stock-chart#running">OpenFin launcher</a> in order for the FDC3 data adapter to handle <a target="_blank" href="https://fdc3.finos.org/docs/1.0/intents-intro">FDC3 intent</a> messages.
                </div>
                }

            </div>
        );
    }

    // optional functions
    public dataProperties: string[] = ["*.open", "*.high", "*.low", "*.close", "*.volume", "*.date"];

    chartRef(chart: IgrFinancialChart) {
        this.chart = chart;
    }

    chartClearClick(e: React.MouseEvent) {
        this.chart.dataSource = null;
        this.FDC3adapter.clearData();
        this.chart.dataSource = this.FDC3adapter.stockPrices;
    }

    log(msg: string) {
        console.log("StockHistoryChart ... " + msg);
    }

    componentDidMount() {
        if (!WinActions.isRunning()) return;

        WinActions.open("Fdc3ExplorerWindow", 500, 700);
    }

    public addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }
}