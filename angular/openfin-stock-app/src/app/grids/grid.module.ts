/* tslint:disable */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IgxGridModule } from "igniteui-angular";

import { GridRoutingModule } from "./grid-routing.module";
import { GridInstrumentsModule } from "./grid-instruments/grid-instruments.module";
import { GridPositionsModule } from "./grid-positions/grid-positions.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        GridRoutingModule,
        GridInstrumentsModule,
        GridPositionsModule,

        IgxGridModule
    ],
})
export class GridModule { }
