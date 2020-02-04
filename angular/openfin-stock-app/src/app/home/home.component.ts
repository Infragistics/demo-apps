import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { OpenfinUtils } from "../../openfin/OpenfinUtils";
import { Router } from "@angular/router";

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";

@Component({
    selector: "app-home",
    styleUrls: ["./home.component.scss"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements AfterViewInit {
    public title = "IG Openfin-FDC3 Apps";
    // public router: Router;
    constructor(private router: Router) {
        document.title = this.title;
    }

    public ngOnInit() {
    }

    public ngAfterViewInit(): void {
        console.log("openfin app loaded");

        // if (!window.hasOwnProperty("fin")) {
        //     console.log("openfin FDC3 is undefined");

        //     // let chartUrl = location.origin + "/pages/view-chart";
        //     // console.log("redirecting: " + chartUrl);
        //     // window.open(chartUrl, "_self"); window.open(link, "_blank");
        //     // this.router.navigateByUrl(chartUrl).then(e => {
        //     // if (e) {
        //     //     console.log("Navigation is successful!");
        //     // } else {
        //     //     console.log("Navigation has failed!");
        //     // }
        //     // });
        // }
    }

    public async OnClickViewInstruments(): Promise<void> {
        console.log("openfin app OnClick ViewInstruments");
        OpenfinUtils.open("/grids/grid-instruments", 600, 515, 0, 550);
    }

    public async OnClickViewPositions(): Promise<void> {
        console.log("openfin app OnClick ViewPositions");
        OpenfinUtils.open("/grids/grid-positions", 800, 615, 0, 350);
    }

    public async OnClickViewChart(): Promise<void> {
        console.log("openfin app OnClick ViewChart");
        OpenfinUtils.open("/charts/view-chart", 800, 555, 0, 10);
    }

    public async OnClickViewSector(): Promise<void> {
        console.log("openfin app OnClick ViewSector");
        OpenfinUtils.open("/charts/view-sector", 800, 555, 0, 10);
    }

    public async OnClickOpenExplorer(): Promise<void> {
        console.log("openfin app OnClick Explorer");
        OpenfinUtils.open("/explorer/explorer-actions", 600, 750, 850, 150);
    }
}