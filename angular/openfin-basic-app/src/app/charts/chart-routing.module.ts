/* tslint:disable */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewChartComponent } from './view-chart/view-chart.component';
import { chartRoutesData } from './chart-routes-data';

export const chartRoutes: Routes = [
    {
        component: ViewChartComponent,
        data: chartRoutesData['view-chart'],
        path: 'view-chart'
    }
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
