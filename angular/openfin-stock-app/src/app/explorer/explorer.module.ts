/* tslint:disable */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ExplorerRoutingModule } from "./explorer-routing.module";
import { ExplorerActionsModule } from "./actions/explorer-actions.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        ExplorerRoutingModule,
        ExplorerActionsModule
    ],
})
export class ExplorerModule { }
