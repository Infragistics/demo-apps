import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule,   IgxSwitchModule,

    IgxNavbarModule, IgxListModule,
    IgxNavigationDrawerModule,
} from "igniteui-angular";
import { IgxFinancialChartModule } from "igniteui-angular-charts";
import { IgxZoomSliderDynamicModule } from "igniteui-angular-charts";

import { ViewChartComponent } from "./view-chart.component";

@NgModule({
    declarations: [
        ViewChartComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        IgxFinancialChartModule,
        IgxZoomSliderDynamicModule,

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
export class ViewChartModule { }
