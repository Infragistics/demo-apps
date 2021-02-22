/* tslint:disable */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { gridRoutesData } from './grid-routes-data';

import { GridPositionsComponent } from './grid-positions/grid-positions.component';

export const gridRoutes: Routes = [
    {
        component: GridPositionsComponent,
        data: gridRoutesData['grid-positions'],
        path: 'grid-positions'
    }
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
