import { Component } from "@angular/core";

// console.log("app.component loaded");

@Component({
    selector: "app-root",
    styleUrls: ["./app.component.scss"],
    templateUrl: "./app.component.html"
})
export class AppComponent {
    public title = "Samples";

    constructor() {
        // console.log("app.component ()");
    }
}
