/* tslint:disable */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// import { IgxSliderModule } from "igniteui-angular";
// import { IgxCategoryChartModule } from "igniteui-angular-charts";
// import { IgxZoomSliderDynamicModule } from "igniteui-angular-charts";

import { ChartRoutingModule } from "./chart-routing.module";
import { ViewChartModule } from "./view-chart/view-chart.module";
import { ViewSectorModule } from "./view-sector/view-sector.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ViewChartModule,
        ViewSectorModule,
        ChartRoutingModule,

        // IgxCategoryChartModule,
        // IgxSliderModule,
        // IgxZoomSliderDynamicModule
    ],
})
export class ChartModule { }
