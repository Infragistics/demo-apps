/* tslint:disable */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IgxSliderModule } from "igniteui-angular";
import { IgxCategoryChartModule } from "igniteui-angular-charts";
import { IgxZoomSliderDynamicModule } from "igniteui-angular-charts";

import { ChartRoutingModule } from "./chart-routing.module";
import { ChartViewModule } from "./chart-view/chart-view.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ChartRoutingModule,
        ChartViewModule,

        IgxCategoryChartModule,
        IgxSliderModule,
        IgxZoomSliderDynamicModule
    ],
})
export class ChartModule { }
