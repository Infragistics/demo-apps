
#### Infragistics Stock Chart App with FDC3 data adapter

This repository contains implementation of React application with Infragistics components. This application demonstrate how to use [Financial Chart](https://infragistics.com/reactsite/components/financial-chart.html)  components with [FDC3 Data Adapter](https://www.npmjs.com/package/igniteui-react-fdc3) to handle [ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) intent messages sent via [OpenFin FDC3](https://developers.openfin.co/docs/fdc3) service. You can run this application locally in [OpenFin](https://developers.openfin.co/docs/openfin-os/) window by following [these](https://github.com/Infragistics/demo-apps/tree/master/react/open-fin-stock-chart#running) instructions. Also, you can run this application with other applications that use OpenFin FDC3 service to communicate with each other.

<img src="./public/images/chart-app.png" width="700" />

## Table of Contents

- [Components](#Components)
- [Code Snippet](#Code)
- [Installation](#Installation)
- [Running](#Running)
- [Testing](#Testing)


## Components

This application is using the following Infragistics components:

- Financial Chart
- Zoom Slider
- FDC3 Data Adapter

## Code

The following code snippet shows how to create FDC3 data adapter and binding its data to Infragistics [React Financial Chart](https://infragistics.com/reactsite/components/financial-chart.html) component.

```ts
// creating an instance of FDC3 data adapter
this.FDC3adapter = new Fdc3DataAdapter();
// subscribing to FDC3 "ViewChart" intent
this.FDC3adapter.subscribe("ViewChart");
// handling FDC3 intents sent via OpenFin's FDC3 service
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    // binding financial chart to data
    this.financialChart.dataSource = this.FDC3adapter.stockPrices;
};

// creating context for FDC3 message
let context = new Fdc3Instrument();
context.ticker = "TSLA";
// sending FDC3 message with instrument as context to IgStockCharts app
this.FDC3adapter.sendInstrument("ViewChart", context, "IgStockCharts");
```

## Installation

Set up this project by following these instructions:

- open **VS Code** as administrator
- open the folder that contains this repository, e.g. `C:\Github\stock-market-chart`
- select **Terminal** - **New Terminal** menu item
- run this command to install required packages and Ignite UI for React packages from npm website

```
npm install
```

## Running

Run this command to host this app locally in a browser:

```
npm run-script start
```

This will open a website in an internet browser at [localhost:3500](http://localhost:3500/) address. While running in
a browser, the app does not support any **OpenFin** actions (e.g. [FDC3 ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) intent) because they require connection to host it from **OpenFin** launcher. Therefore, you need to open a new terminal (**Terminal** - **Split Terminal** menu item) and run this command:

```
npm run-script openfin
```

This will start **OpenFin** launcher and host the app in an **OpenFin** window, where all functionalities are enabled, e.g. [FDC3 ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro)


## Testing

While this React app is running in **OpenFin** window, you can use send FDC3 messages from provided FDC3 Explorer window or you run other applications that use [OpenFin FDC3](https://developers.openfin.co/docs/fdc3) service.

<img src="./public/images/chart-app.png" width="700" />