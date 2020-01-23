import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Openfin } from "../openfin/Openfin";

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls:  ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
    public title = "IG Openfin-FDC3 Apps";

    constructor() {
        document.title = this.title;
    }

    public ngAfterViewInit(): void {
        console.log("openfin app loaded");

        if (openfinFdc3 === undefined) {
            console.log("openfin FDC3 is undefined"); return;
        }
    }

    public async OpenGridInstruments(): Promise<void> {
        console.log("openfin app OpenGridInstruments()");
        Openfin.create("ViewInstrument Window", 600, 515, 0, 550);
    }

    public async OpenGridPositions(): Promise<void> {
        console.log("openfin app OpenGridPositions()");
        Openfin.create("ViewPosition Window", 600, 515, 0, 550);
    }

    public async OpenChart(): Promise<void> {
        console.log("openfin app OpenChart()");
        Openfin.create("ViewChart Window", 700, 515, 0, 10);
    }

    public async OpenExplorer(): Promise<void> {
        console.log("openfin app OpenExplorer()");
        Openfin.create("Explorer Window", 500, 640, 700, 150);
    }

}
