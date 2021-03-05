import { AfterViewInit, Component, ViewChild } from "@angular/core";

// required import for initalizing Fdc3DataAdapter:
import * as openfinFdc3 from "openfin-fdc3";
declare var fin: any; // openfin
import { OpenfinUtils } from "../../../openfin/OpenfinUtils"

import { Fdc3DataAdapter } from "igniteui-angular-fdc3"; // for working with FDC3 data adapter
import { Fdc3Instrument } from "igniteui-angular-fdc3";  // for sending ViewSector with single stock symbol
import { Fdc3Message } from "igniteui-angular-fdc3";     // for receiving ViewSector messages

// required imports for working with Treemap
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { IgxTreemapComponent, TreemapLayoutType } from "igniteui-angular-charts";
import { ISelectionEventArgs } from "igniteui-angular";

@Component({
    selector: "app-view-sector",
    templateUrl: "./view-sector.component.html",
    styleUrls:  ["./view-sector.component.scss"]
})
export class ViewSectorComponent implements AfterViewInit {

    public title = "Treemap - FDC3 ViewSector";
    public dataSource: any[];
    public FDC3adapter: Fdc3DataAdapter;

    @ViewChild("treemap", { static: true })
    public treemap: IgxTreemapComponent;

    public layoutSelected = TreemapLayoutType.Squarified;
    public layoutOptions: any[] = [
        { text: "Squarified", value: TreemapLayoutType.Squarified },
        { text: "Stripped", value: TreemapLayoutType.Stripped },
        // { text: "SliceAndDice", value: TreemapLayoutType.SliceAndDice },
    ];

    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;

    public darkTheme: boolean = false;
    public selected = "All";
    public sectorNames: string[] = [
        "Transportation", "Technology",
        "Financial", "Consumer Goods",
        "Communication", "Materials",
        "All"
    ];

    public CurrentApp: any;

    constructor() {
        document.title = this.title;
    }

    public async InitializeFDC3(): Promise<void> {

        if (window.hasOwnProperty("fin")) {
            this.CurrentApp = await fin.Application.getCurrent();
        }

        // creating FDC3 data adapter with reference to openfin
        this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);

        // subscribing to custom FDC3 "ViewSector" intent
        this.FDC3adapter.subscribe("ViewSector");

        // handling FDC3 intents sent via OpenFin's FDC3 service
        this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
            // at this point, FDC3 data adapter has already processed FDC3 intent
            // so we can just update the Treemap with name of the financial sector
            this.UpdateTreemap(msg.context.name);

            // console.log("openfin received message: \n" + msg.json);

            const title = "FDC3 " + msg.intentType + " intent";
            let info = "";
            // info += "\n intent: " + msg.intentType;
            info += "\n sector: " + msg.context.name;
            info += "\n context: " + msg.contextType;
            OpenfinUtils.notify(title, info, "FDC3");
        };

        // default to show all sectors
        this.UpdateTreemap("All");
    }

    public async ViewSector(name: any) {
        this.selected = name;

        if (window.hasOwnProperty("fin")) {
            // creating context for FDC3 message
            const context = new Fdc3Instrument();
            context.name =  name;
            // const app = await fin.Application.getCurrent();
            const target = this.CurrentApp.identity.uuid;
            // sending FDC3 message with instrument as context to IG Stock Dashboard app app
            this.FDC3adapter.sendInstrument("ViewSector", context, target);

        } else {
            // by-passing OpenFin service since it is not running
            this.UpdateTreemap(name);
        }

    }

    public UpdateTreemap(sectorName?: string) {

        let dataMap = new Map();
        for (const stock of this.FDC3adapter.stockDetails) {

            if (this.sectorNames.indexOf(stock.sector) === -1) continue;

            if (stock.sector === sectorName || sectorName === "All") {
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
        console.log("dataSource " + dataSource.length);

        if (this.treemap === undefined) { return; }

        this.treemap.dataSource = dataSource;
        // this.treemap.layoutType = TreemapLayoutType.SliceAndDice;
        this.treemap.markDirty();
        this.treemap.flush();
        // this.treemap.fillScaleMode = TreemapFillScaleMode.Value;
        // this.treemap.fillScaleMinimumValue = 0;
        // this.treemap.fillScaleMaximumValue = 1200;
    }

    public GetSectorParent(stock: any): any {
        const sectorItem = {
            name: stock.sector,
            id: stock.sector,
            marketCap: NaN,
        };
        return sectorItem;
    }

    public GetSectorItem(stock: any): any {
        const stockValue = Math.round(stock.marketCap);
        const sectorItem = {
            symbol: stock.symbol,
            name: stock.symbol + " " + stockValue + "B",
            id: stock.symbol,
            parent: stock.sector,
            marketCap: stockValue,
        };
        return sectorItem;
    }

    public ngAfterViewInit(): void {
        console.log("app view loaded");

        this.drawer.width = "240px";

        const element = document.getElementsByClassName("igx-navbar")[0]; // as HTMLElement;
        element.setAttribute("style", "background: #c27bfb");

        this.InitializeFDC3();
    }

    public drawerToggle(): void {
        this.drawer.pin = true;
        this.drawer.toggle();
    }

    public themeChange() {
        this.darkTheme = !this.darkTheme;

        if (this.darkTheme) {
            this.treemap.outline = "black";
            this.treemap.textColor = "black";
            this.treemap.darkTextColor = "black";
            this.treemap.headerTextColor = "lightgray";
            this.treemap.headerDarkTextColor = "lightgray";
            // this.treemap.headerBackground = "#28E124";
            // this.treemap.overlayHeaderBackground = "#28E124";
            // this.treemap.overlayHeaderHoverBackground = "#28E124";
            // this.treemap.headerHoverBackground = "#28E124";
        } else {
            this.treemap.outline = "white";
            this.treemap.textColor = "white";
            this.treemap.darkTextColor = "white";
            this.treemap.headerTextColor = "white";
            this.treemap.headerDarkTextColor = "white";
            // this.treemap.headerBackground = "#E0F11F";
            // this.treemap.overlayHeaderBackground = "#E0F11F";
            // this.treemap.overlayHeaderHoverBackground = "#28E124";
            // this.treemap.headerHoverBackground = "#28E124";
        }
    }

    public onLayoutChange(event: ISelectionEventArgs) {
        this.layoutSelected = event.newSelection.value;
    }

}
