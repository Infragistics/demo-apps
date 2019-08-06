import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';
import App from './old/App';
import AppWeb from './old/AppWeb';
import WinContent from './components/WinContent';
import WinManager from './components/WinManager';

import * as serviceWorker from './serviceWorker';

console.log("index location: " +  document.location);

const appRoot = document.getElementById('root');

// once the DOM has loaded and the OpenFin API is ready
async function initWeb() {
  console.log("index Openfin disconnected");
  // ReactDOM.render(<AppWeb />, appRoot);
  ReactDOM.render(<WinContent />, appRoot);
}

if (document.head) {
   console.log("index title: " +  document.title);
}

if (!window.hasOwnProperty("fin")) {
    initWeb();
} else {
    initOpenfin();
}

// once the DOM has loaded and the OpenFin API is ready
async function initOpenfin() {
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();
    const ver = await fin.System.getVersion();

    console.log("index Openfin connected (ver " + ver + ")");
    console.log("index Openfin uuid: " + app.identity.uuid);
    console.log("index Openfin name: " + win.identity.name);

    if (win.identity.name === undefined ||
        win.identity.name.indexOf("IgStockCharts") > -1) {
        console.log("index Openfin stock: default");
        // ReactDOM.render(<AppWeb />, appRoot);
        ReactDOM.render(<WinContent />, appRoot);
    } else {
      console.log("index Openfin name: " + win.identity.name.indexOf("WinChart"));

      console.log("index render");
      if (win.identity.name.indexOf("IgStockChild|") > -1) {
        const stockSymbol = win.identity.name.split("|")[1];
        console.log("index Openfin stock: " + stockSymbol);
        // const appWin = await app.getWindow();
        // WinManager.register(stockSymbol, appWin);

        ReactDOM.render(<WinContent StockSymbols={stockSymbol} StockMenuOpen={false} />, appRoot);
      } else {
        // ReactDOM.render(<App />, appRoot);
        ReactDOM.render(<WinContent />, appRoot);
      }
    }

    // fin.desktop.System.showDeveloperTools(app.identity.uuid, app.identity.uuid);

    // Only launch new windows from the main window.
    // if (win.identity.name === app.identity.uuid) {
    //     // subscribing to the run-requested events will allow us to react to secondary launches,
    //     // clicking on the icon once the Application is running for example.
    //     // for this app we will launch a child window the first the user clicks on the desktop.

    //     app.once('run-requested', async () => {
    //         await fin.Window.create({
    //             name: 'childWindow',
    //             url: location.href,
    //             defaultWidth: 320,
    //             defaultHeight: 320,
    //             autoShow: true
    //         });
    //     });
    // }
}

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();




function initDragWindow () {
  console.log('draggable create... ');
  var dargWindow1 = new fin.desktop.Window({
      url: "http://localhost:3400/draggable.html",
      name: "frameless_example1",
      defaultWidth: 300,
      defaultHeight: 300,
      autoShow: false,
      saveWindowState: false,
      showTaskbarIcon: true,
      resizable: true,
      frame: false
  }, function() {
    console.log('draggable create done... ');

    let toolbar = document.getElementById("toolbar");
    if (toolbar == null) {
      console.log('draggable toolbar null: ');
    } else {
      console.log('draggable toolbar found: ');
    }
    dargWindow1.show();
      // console.log('Child window created: ', this)
  });
  var dargWindow2 = new fin.desktop.Window({
    url: "http://localhost:3400/draggable.html",
    name: "frameless_example2",
    defaultWidth: 300,
    defaultHeight: 300,
    autoShow: true,
    saveWindowState: false,
    showTaskbarIcon: true,
    resizable: true,
    frame: false
  }, function(){
    console.log('Drag window2 created: ')

    let winRoot = document.createElement('div');

    var wnd = dargWindow2.getNativeWindow();
    dargWindow1.show();

      // console.log('Child window created: ', this)
  });
};

// function initNoOpenFin(){
//   alert("OpenFin is not available. You are in a browser.");
// }
