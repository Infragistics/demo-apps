import { DOCUMENT } from "@angular/common";
import { Component, HostListener, Inject, OnInit } from "@angular/core";

@Component({
    selector: "app-container",
    styleUrls: ["./container.component.scss"],
    template: `<router-outlet></router-outlet>`
})

export class ContainerComponent {

    constructor() {
        // console.log("container ()");
    }
}
