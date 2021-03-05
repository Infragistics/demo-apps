import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule, IgxSwitchModule,
    IgxNavbarModule, IgxListModule, IgxDropDownModule, IgxToggleModule,
    IgxNavigationDrawerModule,
} from "igniteui-angular";
import { IgxOverlaysModule } from "igniteui-angular-charts";
import { IgxTreemapModule} from "igniteui-angular-charts";
import { IgxDataChartInteractivityModule } from "igniteui-angular-charts";

import { ViewSectorComponent } from "./view-sector.component";

@NgModule({
    declarations: [
        ViewSectorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        IgxTreemapModule,
        IgxDataChartInteractivityModule,

        IgxOverlaysModule,
        IgxToggleModule,
        IgxDropDownModule,
        IgxButtonModule,
        IgxRippleModule,
        IgxIconModule,
        IgxLayoutModule,
        IgxInputGroupModule,
        IgxSwitchModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,
    ],
})
export class ViewSectorModule { }
