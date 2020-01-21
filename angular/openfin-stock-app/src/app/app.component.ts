import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { Openfin } from "../openfin/utils";

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls:  ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
    public title = "Openfin-FDC3 Apps";

    constructor() {
        console.log("app ()");
        document.title = this.title;
    }

    public ngAfterViewInit(): void {
        console.log("app loaded");

        if (openfinFdc3 === undefined) {
            console.log("openfinFdc3 is undefined"); return;
        }
    }

    public async OpenGrid(): Promise<void> {
        console.log("app OpenGrid");
        Openfin.create("Grid Window", 900, 400, 0, 650);
    }

    public async OpenChart(): Promise<void> {
        console.log("app OpenChart");
        Openfin.create("Chart Window", 900, 515, 0, 150);
    }

    public async OpenExplorer(): Promise<void> {
        console.log("app OpenExplorer");
        Openfin.create("Explorer Window", 500, 640, 900, 150);
    }

}
