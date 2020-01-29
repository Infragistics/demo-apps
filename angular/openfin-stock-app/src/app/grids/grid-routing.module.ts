/* tslint:disable */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { gridRoutesData } from "./grid-routes-data";

import { GridInstrumentsComponent } from "./grid-instruments/grid-instruments.component";
import { GridPositionsComponent } from "./grid-positions/grid-positions.component";

export const gridRoutes: Routes = [
    {
        component: GridInstrumentsComponent,
        data: gridRoutesData["grid-instruments"],
        path: "grid-instruments"
    },
    {
        component: GridPositionsComponent,
        data: gridRoutesData["grid-positions"],
        path: "grid-positions"
    },
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(gridRoutes)
    ]
})
export class GridRoutingModule { }
