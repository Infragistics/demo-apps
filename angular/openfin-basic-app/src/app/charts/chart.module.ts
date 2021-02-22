/* tslint:disable */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartRoutingModule } from './chart-routing.module';
import { ViewChartModule } from './view-chart/view-chart.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ViewChartModule,
        ChartRoutingModule
    ]
})
export class ChartModule { }
