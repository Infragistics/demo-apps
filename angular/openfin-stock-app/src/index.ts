import "hammerjs";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { ExplorerModule } from "./app/explorer/explorer.module";
import { ChartModule } from "./app/chart/chart.module";
import { GridModule } from "./app/grid/grid.module";

import { environment } from "./environments/environment";
import { Openfin } from "./openfin/utils";
declare var fin: any; // openfin

if (Openfin.isRunning()) {
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
    console.log("app customData: " + winOptions.customData);

    if (winOptions.customData === "Chart Window") {
        platformBrowserDynamic().bootstrapModule(ChartModule)
        .catch(err => console.error(err));

    } else if (winOptions.customData === "Grid Window") {
        platformBrowserDynamic().bootstrapModule(GridModule)
        .catch(err => console.error(err));

    } else if (winOptions.customData === "Explorer Window") {
        platformBrowserDynamic().bootstrapModule(ExplorerModule)
        .catch(err => console.error(err));

    } else { // default to the main app window
        document.title = "Openfin-FDC3 Apps";
        platformBrowserDynamic().bootstrapModule(AppModule)
            .catch(err => console.error(err));
        // platformBrowserDynamic().bootstrapModule(ChartModule)
        //     .catch(err => console.error(err));
    }
}

function initWeb(): void {
    console.log("app running in browser");

    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
    // platformBrowserDynamic().bootstrapModule(ChartModule)
    //     .catch(err => console.error(err));
}
