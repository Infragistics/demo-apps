## Infragistics Stock App with FDC3 Data Adapter

## Table of Contents

- [Introduction](#Introduction)
- [Components](#Components)
- [Instructions](#Instructions)
    - [Installation](#Installation)
    - [Running](#Running)
    - [Testing](#Testing)
- [Code Snippets](#Code-Snippets)
    - [Creating FDC3 Data Adapter](#Creating-FDC3-Data-Adapter)
    - [Sending FDC3 ViewChart](#Sending-FDC3-ViewChart)
    - [Sending FDC3 ViewInstrument](#Sending-FDC3-ViewInstrument)
    - [Sending FDC3 ViewPosition](#Sending-FDC3-ViewPosition)
    - [Sending FDC3 ViewPortfolio](#Sending-FDC3-ViewPortfolio)
    - [Sending FDC3 ViewSector](#Sending-FDC3-ViewSector)

## Introduction

This repository contains Angular Stock application that demonstrates how to use [Financial Chart](https://infragistics.com/angularsite/components/financial-chart.html) component with [FDC3 Data Adapter](https://www.npmjs.com/package/igniteui-angular-fdc3) to handle [ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) intent messages sent via [OpenFin FDC3](https://developers.openfin.co/docs/fdc3) service. Also, it shows how you can send other FDC3 messages with `ViewInstrument`, `ViewPosition`, and `ViewPortfolio` intents.

You can run this application locally in [OpenFin](https://developers.openfin.co/docs/openfin-os/) window by following [these](https://github.com/Infragistics/demo-apps/tree/master/angular/open-fin-stock-app#running) instructions. Also, you can run this application with other applications that use OpenFin FDC3 service to communicate with each other.

<img src="src/assets/images/previews/app_view_all.PNG" width="700" />

## Components

This application is using the following Infragistics components:

- [Financial Chart](https://infragistics.com/angularsite/components/financial-chart.html)
- [Data Grid](https://www.infragistics.com//angularsite/components/grid/grid.html)
- [Zoom Slider](https://infragistics.com/angularsite/components/zoomslider-overview.html)
- [FDC3 Data Adapter](https://www.npmjs.com/package/igniteui-angular-fdc3)

## Code Snippets

#### Creating FDC3 Data Adapter

The following code snippet shows how to create FDC3 data adapter and subscribe to ViewChart intent which will be handled and generate data for binding to Infragistics [Angular Financial Chart](https://infragistics.com/angularsite/components/financial-chart.html) component.

```ts
import { Fdc3DataAdapter } from "igniteui-angular-fdc3"
import { Fdc3Message } from 'igniteui-angular-fdc3';
import { IgxFinancialChartComponent } from "igniteui-angular-charts";

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";
// ...

// creating FDC3 data adapter with reference to openfin
this.FDC3adapter = new new Fdc3DataAdapter(openfinFdc3);
// subscribing to FDC3 "ViewChart" intent
this.FDC3adapter.subscribe("ViewChart");
// handling FDC3 intents sent via OpenFin's FDC3 service
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    // binding financial chart to data
    this.chart.dataSource = this.FDC3adapter.stockPrices;
};
```

#### Sending FDC3 ViewChart

This code snippet show how to send FDC3 **ViewChart** intent that can be consumed by [Financial Chart](https://infragistics.com/angularsite/components/financial-chart.html) component.

```ts
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { IgxFinancialChartComponent } from "igniteui-angular-charts";
// ...

// creating context for FDC3 message
let instrument = new Fdc3Instrument();
instrument.ticker = "TSLA";
// sending FDC3 ViewChart intent to "IgStockAppUID" app
this.FDC3adapter.sendInstrument("ViewChart", instrument, "IgStockAppUID");

// handling FDC3 ViewChart intent
this.FDC3adapter.subscribe("ViewChart");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    this.chart.dataSource = this.FDC3adapter.stockPrices;
};
```

<img src="src/assets/images/previews/app_view_chart.PNG" width="700" />


#### Sending FDC3 ViewInstrument

This code snippet show how to send FDC3 **ViewInstrument** intent that can be consumed by [Data Grid](https://www.infragistics.com//angularsite/components/grid/grid.html) component.

```ts
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { IgxGridComponent  } from "igniteui-angular";
// ...

// creating context for FDC3 message
let instrument = new Fdc3Instrument();
instrument.ticker = "TSLA";
// sending FDC3 ViewInstrument intent to "IgStockAppUID" app
this.FDC3adapter.sendInstrument("ViewInstrument", instrument, "IgStockAppUID");

// handling FDC3 ViewInstrument intent
this.FDC3adapter.subscribe("ViewInstrument");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    this.grid.data = this.FDC3adapter.stockPositions;
};
```

<img src="src/assets/images/previews/app_view_instrument.PNG" width="700" />

#### Sending FDC3 ViewPosition

```ts
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { Fdc3Position } from "igniteui-angular-fdc3";
import { IgxGridComponent  } from "igniteui-angular";
// ...

let instrument = new Fdc3Instrument();
instrument.ticker = "TSLA";

// creating context for FDC3 message
let position = new Fdc3Position();
position.instrument = instrument;
// optional setting properties for purchase order:
position.shares = 100;
position.price = details.marketPrice;

// sending FDC3 ViewPosition intent to "IgStockAppUID" app
this.FDC3adapter.sendPosition("ViewPosition", position, "IgStockAppUID");

// handling FDC3 ViewPosition intent
this.FDC3adapter.subscribe("ViewPosition");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    this.grid.data = this.FDC3adapter.stockPositions;
};
```

<img src="src/assets/images/previews/app_view_position.PNG" width="700" />

#### Sending FDC3 ViewPortfolio

```ts
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { Fdc3Position } from "igniteui-angular-fdc3";
import { IgxGridComponent  } from "igniteui-angular";
// ...

let instrumentA = new Fdc3Instrument();
instrumentA.ticker = "TSLA";
let positionA = new Fdc3Position();
positionA.instrument = instrument;

let instrumentB = new Fdc3Instrument();
instrumentB.ticker = "UBER";
let positionB = new Fdc3Position();
positionB.instrument = instrument;

// creating context for FDC3 message
const portfolio = new Fdc3Portfolio();
portfolio.positions.push(positionA);
portfolio.positions.push(positionB);

// sending FDC3 ViewPortfolio intent to "IgStockAppUID" app
this.FDC3adapter.sendPortfolio("ViewPortfolio", portfolio, "IgStockAppUID");

// handling FDC3 ViewPortfolio intent
this.FDC3adapter.subscribe("ViewPortfolio");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    this.grid.data = this.FDC3adapter.stockPositions;
};
```

<img src="src/assets/images/previews/app_view_portfolio.PNG" width="700" />

#### Sending FDC3 ViewSector

This code snippet show how to send custom FDC3 **ViewSector** intent that can be consumed by [Treemap](https://www.infragistics.com//angularsite/components/treemap-overview.html) component.

```ts
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { IgxTreemapComponent } from "igniteui-angular-charts";

// ...

// creating context for FDC3 message
let instrument = new Fdc3Instrument();
instrument.name = "Technology";
// sending FDC3 ViewSector intent to "IgStockAppUID" app
this.FDC3adapter.sendInstrument("ViewSector", instrument, "IgStockAppUID");

// handling FDC3 ViewSector intent
this.FDC3adapter.subscribe("ViewSector");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {

    let dataMap = new Map();
    for (const stock of this.FDC3adapter.stockDetails) {

        if (stock.sector === msg.context.name || msg.context.name === "All") {
            if (!dataMap.has(stock.sector)) {
                const sectorParent = this.GetSectorParent(stock);
                dataMap.set(stock.sector, sectorParent);
            }

            if (!dataMap.has(stock.symbol)) {
                const sectorItem = this.GetSectorItem(stock);
                dataMap.set(stock.symbol, sectorItem);
            }
        }
    }
    const dataSource = Array.from(dataMap.values());
    this.treemap.dataSource = dataSource;
};
```

<img src="src/assets/images/previews/app_view_sector.PNG" width="700" />

## Instructions

#### Installation

Set up this project by following these instructions:

- open **VS Code** as administrator
- open the folder that contains this repository, e.g. `C:\Github\openfin-stock-app`
- select **Terminal** - **New Terminal** menu item
- run this command to install openfin-cli
```
npm install -g openfin-cli
```

- run this command to install required packages for this app

```
npm install
```

#### Running

1. Run this command to host this app locally in a browser:

```
npm run-script start
```

2. Wait until you see this message:

**Angular Live Development Server is listening on localhost:4200**

3. Open your browser at this address:

[http://localhost:4200/angular-sample-apps/stocks-dashboard/](http://localhost:4200/angular-sample-apps/stocks-dashboard/)

Note while running in a browser, the app does not support any **OpenFin** actions (e.g. [FDC3 ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) intent) because they require connection to host it from **OpenFin** launcher.

4. Therefore, you need to open a new terminal (**Terminal** - **New Terminal** menu item)

5. Run the following command to start **OpenFin** launcher and host the app in an **OpenFin** window, where all functionalities are enabled, e.g. [FDC3 ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro):

```
npm run-script openfin
```

#### Testing

While this Angular app is running in **OpenFin** window, you can send FDC3 messages from provided FDC3 Explorer window or you run other applications that use [OpenFin FDC3](https://developers.openfin.co/docs/fdc3) service.

<img src="src/assets/images/previews/app_view_all.PNG" width="700" />


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
