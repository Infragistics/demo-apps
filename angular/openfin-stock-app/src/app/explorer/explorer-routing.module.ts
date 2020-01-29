/* tslint:disable */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExplorerActionsComponent } from "./actions/explorer-actions.component";
import { explorerRoutesData } from "./explorer-routes-data";

export const explorerRoutes: Routes = [
    {
        component: ExplorerActionsComponent,
        data: explorerRoutesData["explorer-actions"],
        path: "explorer-actions"
    },
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(explorerRoutes)
    ]
})
export class ExplorerRoutingModule { }
