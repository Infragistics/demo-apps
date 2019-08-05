import "@babel/polyfill";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// import AppRouter from './routing/AppRouter'
import AppView from './views/AppView'
import RegisterServiceWorker from './ServiceWorker';

console.log("Starting app in " + process.env.NODE_ENV + " environment");

ReactDOM.render(
  <BrowserRouter basename={AppView.basename}>
    <AppView   />
    {/* <AppRouter   /> */}
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

RegisterServiceWorker();


