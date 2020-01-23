import { NgModule } from "@angular/core";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IgxGridModule } from "igniteui-angular";

import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule,   IgxSwitchModule,

    IgxNavbarModule, IgxListModule,
    IgxNavigationDrawerModule,
} from "igniteui-angular";

import { GridInstrumentsComponent } from "./grid-instruments.component";

@NgModule({
    declarations: [
        GridInstrumentsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IgxGridModule,

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
    bootstrap: [GridInstrumentsComponent]
})
export class GridInstrumentsModule { }
