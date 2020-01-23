import "hammerjs";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { ExplorerModule } from "./app/explorer/explorer.module";

import { ChartModule } from "./app/chart/chart.module";
import { GridInstrumentsModule } from "./app/grid-instruments/grid-instruments.module";
import { GridPositionsModule } from "./app/grid-positions/grid-positions.module";

import { environment } from "./environments/environment";
import { Openfin } from "./openfin/Openfin";

declare var fin: any; // openfin

if (window.hasOwnProperty("fin")) {
    initOpenfin();
} else {
    initWeb();
}

if (environment.production) {
    enableProdMode();
}

async function initOpenfin(): Promise<void> {

    Openfin.logInfo();
    const win = await fin.Window.getCurrent();
    const winOptions = await win.getOptions();
    console.log("openfin app window: '" + winOptions.customData + "'");

    if (winOptions.customData === "ViewChart Window") {
        platformBrowserDynamic().bootstrapModule(ChartModule)
        .catch(err => console.error(err));

    } else if (winOptions.customData === "ViewPosition Window") {
        platformBrowserDynamic().bootstrapModule(GridPositionsModule)
        .catch(err => console.error(err));

    } else if (winOptions.customData === "ViewInstrument Window") {
        platformBrowserDynamic().bootstrapModule(GridInstrumentsModule)
        .catch(err => console.error(err));

    } else if (winOptions.customData === "Explorer Window") {
        platformBrowserDynamic().bootstrapModule(ExplorerModule)
        .catch(err => console.error(err));

    } else { // default to the main app window
        document.title = "IG Openfin-FDC3 Apps";
        platformBrowserDynamic().bootstrapModule(AppModule)
            .catch(err => console.error(err));
        // platformBrowserDynamic().bootstrapModule(ChartModule)
        //     .catch(err => console.error(err));
    }
}

function initWeb(): void {
    console.log("app running in browser");

    // platformBrowserDynamic().bootstrapModule(AppModule)
    // .catch(err => console.error(err));
    platformBrowserDynamic().bootstrapModule(ChartModule)
        .catch(err => console.error(err));
}
