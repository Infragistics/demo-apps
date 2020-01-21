import { NgModule } from "@angular/core";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IgxFinancialChartModule } from "igniteui-angular-charts";
import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule,   IgxSwitchModule,

    IgxNavbarModule, IgxListModule,
    IgxNavigationDrawerModule,
} from "igniteui-angular";

import { ChartComponent } from "./chart.component";

@NgModule({
    declarations: [
        ChartComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IgxFinancialChartModule,

        IgxButtonModule,
        IgxRippleModule,
        IgxIconModule,
        IgxLayoutModule,
        IgxInputGroupModule,
        IgxSwitchModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,

        // FormsModule,
        // ReactiveFormsModule,

    ],
    providers: [],
    bootstrap: [ChartComponent]
})
export class ChartModule { }
