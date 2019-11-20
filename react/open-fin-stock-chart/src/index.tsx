import React from 'react';
import ReactDOM from 'react-dom';

import Fdc3ChartWindow from './windows/Fdc3ChartWindow';
import Fdc3ExplorerWindow from './windows/Fdc3ExplorerWindow';
import * as serviceWorker from './serviceWorker';

console.log("index location: " +  document.location);

const appRoot = document.getElementById('root');

if (!window.hasOwnProperty("fin")) {
    initWeb();
} else {
    initOpenfin();
}

// once the DOM has loaded and the OpenFin API is ready
async function initWeb() {
  console.log("index Openfin disconnected");
  ReactDOM.render(<Fdc3ChartWindow />, appRoot);
}

// once the DOM has loaded and the OpenFin API is ready
async function initOpenfin() {
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();
    const ver = await fin.System.getVersion();

    // console.log("index Openfin uuid: " + app.identity.uuid);
    console.log("index Openfin name: " + win.identity.name);

    const windowParams = win.identity.name.split("|");

    if (windowParams.length === 1) {
        ReactDOM.render(<Fdc3ChartWindow />, appRoot);
    } else {
      const windowType = windowParams[1];
      console.log("index Openfin opening: " + windowType);

      if (windowType === 'Fdc3ExplorerWindow') {
        ReactDOM.render(<Fdc3ExplorerWindow  />, appRoot);

      } else {
        ReactDOM.render(<Fdc3ChartWindow />, appRoot);
      }
    }

}
