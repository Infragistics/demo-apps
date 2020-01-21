import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
// import { ChartComponent } from "./chart/chart.component";
import {
    IgxButtonModule, IgxIconModule,
    IgxLayoutModule, IgxRippleModule,
} from "igniteui-angular";


@NgModule({
    declarations: [
        AppComponent,
        // ChartComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        IgxButtonModule,
        IgxRippleModule,
        IgxIconModule,
        IgxLayoutModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
