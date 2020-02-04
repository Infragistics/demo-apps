## IG Grid with FDC3 ViewInstrument Intent

This view is part of Angular Stock application that demonstrates how to use [Financial Chart](https://infragistics.com/angularsite/components/financial-chart.html) component with [FDC3 Data Adapter](https://www.npmjs.com/package/igniteui-angular-fdc3) to handle `ViewInstrument` intent messages sent via [OpenFin FDC3](https://developers.openfin.co/docs/fdc3) service.

To get more information please refer to this [ReadMe](../../../README.md) page.

## Code Snippet

This code snippet show how to send FDC3 **ViewInstrument** intent that can be consumed by [Data Grid](https://www.infragistics.com//angularsite/components/grid/grid.html) component.

```ts
import { Fdc3Instrument } from 'igniteui-angular-fdc3';
import { IgxGridComponent  } from "igniteui-angular";
// ...

// creating context for FDC3 message
let instrument = new Fdc3Instrument();
instrument.ticker = "TSLA";
// sending FDC3 ViewInstrument intent to 'IgStockAppUID' app
this.FDC3adapter.sendInstrument("ViewInstrument", instrument, "IgStockAppUID");

// handling FDC3 ViewInstrument intent
this.FDC3adapter.subscribe("ViewInstrument");
this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
    this.grid.data = this.FDC3adapter.stockPositions;
};
```

<img src="../../../assets/images/previews/app_view_instrument.PNG" width="700" />

