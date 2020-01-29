/* tslint:disable */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChartViewComponent } from "./chart-view/chart-view.component";
import { chartRoutesData } from "./chart-routes-data";

export const chartRoutes: Routes = [
    {
        component: ChartViewComponent,
        data: chartRoutesData["chart-view"],
        path: "chart-view"
    },
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(chartRoutes)
    ]
})
export class ChartRoutingModule { }
