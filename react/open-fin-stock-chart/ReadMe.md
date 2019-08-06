## React Stock Chart App

This repository contains implementation of React app that is hosted in [OpenFin](https://openfin.co/) window, where it can respond to [ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) intent messages sent via [FDC3](https://fdc3.finos.org/docs/1.0/fdc3-intro) protocol to display [React Financial Chart](https://infragistics.com/reactsite/components/financialchart.html) component with stock prices.

## Table of Contents

- [Setup](#Setup)
- [Running](#Running)
- [Testing](#Testing)

<img src="./public/images/chart-app.gif" width="750" />

## Setup

Setup this project by following these instructions:

- open **VS Code** as administrator
- open the folder that contains this repository, e.g. `C:\repositories\demo-apps\open-fin\stock-market-chart`
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

Note this React app running in a browser, does not support any **OpenFin** actions (e.g. Send Stock as FDC3 message) because they require connection to host it from **OpenFin** launcher:


Therefore, you need to open a new terminal (**Terminal** - **Split Terminal** menu item) and run this command:

```
npm run-script openfin:dev
```

This will start **OpenFin** launcher and host the app in **OpenFin** window, where all functionalities are enabled, e.g. Send Stock to a new window via [FDC3 ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro)


## Testing

While this React app is running in **OpenFin** launcher, you can also run other applications that use [FDC3](https://fdc3.finos.org/docs/1.0/fdc3-intro) protocol. For example, you can run WPF app called [OpenFin Stock Chart Trigger](https://github.com/Infragistics/demo-apps/tree/master/wpf/open-fin-stock-chart-trigger) to send stock symbol using [ViewChart](https://fdc3.finos.org/docs/1.0/intents-intro) to this React app. Also, this WPF app shows content of all messages sent via [FDC3](https://fdc3.finos.org/docs/1.0/fdc3-intro) protocol so you can use it in development of your own app.

<img src="./public/images/chart-trigger.gif" width="750" />