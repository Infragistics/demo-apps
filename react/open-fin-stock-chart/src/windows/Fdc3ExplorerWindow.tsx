import React from 'react';
import WinActions from './WinActions';

// required imports for working with FDC3 data adapter
import { Fdc3DataAdapter } from "igniteui-react-fdc3/ES5/Fdc3DataAdapter"
import { Fdc3Message } from 'igniteui-react-fdc3/ES5/Fdc3Message';
import { Fdc3Context } from 'igniteui-react-fdc3/ES5/Fdc3Context';
import { Fdc3Instrument } from 'igniteui-react-fdc3/ES5/Fdc3Instrument';
import { Fdc3InstrumentList } from 'igniteui-react-fdc3/ES5/Fdc3InstrumentList';

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";

export default class Fdc3ExplorerWindow extends React.Component<any, any> {

    public FDC3adapter: Fdc3DataAdapter;
    public eventCounter: number = 0;

    constructor(props: any) {
        super(props);

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to intents
        this.FDC3adapter.subscribe("ViewChart");      // standard FDC3 intent
        this.FDC3adapter.subscribe("ViewInstrument"); // standard FDC3 intent
        this.FDC3adapter.subscribe("SellPosition");   // custom FDC3 intent
        this.FDC3adapter.subscribe("SellPortfolio");  // custom FDC3 intent

        // handling FDC3 messages received via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {

            this.eventCounter++;
            // collecting all messages as JSON string
            let history = "Message #" + this.eventCounter + " ";
            history += "'" + msg.intentType + "' intent \n";
            history += msg.json + "\n" + this.state.fdc3events;

            this.setState({ fdc3events: history  });

            console.log('messageReceived \''
            + msg.intentType + '\' intent,  \''
            + msg.contextType + '\' context, ' + msg.tickerSymbols);
        };

        document.title = "FDC3 Explorer";

        this.clearEventsClick = this.clearEventsClick.bind(this);
        this.viewChartClick = this.viewChartClick.bind(this);
        this.viewMultipleClick = this.viewMultipleClick.bind(this);

        this.state = { fdc3events: "" }
    }

    render() {

        return (
            <div className="chartWindow" >

                <div className="eventsTitle">FDC3 messages sent via OpenFin's FDC3 service: </div>
                <div className="eventsContainer" >
                    {this.state.fdc3events}
                </div>

                <div className="buttonContainer" >
                    <div className="buttonViewStocks" onClick={(e) => this.viewChartClick(e, "TSLA")}>View Chart (TSLA)</div>
                    {/* <div className="buttonViewStocks" onClick={(e) => this.viewChartClick(e, "UBER")}>View Chart (UBER)</div> */}
                    <div className="buttonViewMultiple" onClick={this.viewMultipleClick}>View Chart (Multiple)</div>
                    <div className="buttonClearEvents" onClick={this.clearEventsClick}>Clear Events</div>
                </div>

            </div>
        );
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

    clearEventsClick(e: React.MouseEvent) {
        this.eventCounter = 0;
        this.setState({ fdc3events: "" });
    }

    log(msg: string) {
        console.log("FDC3-Explorer ... " + msg);
    }

    componentDidMount() {
        if (!WinActions.isRunning()) return;

    }
}