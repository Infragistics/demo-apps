import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule,   IgxSwitchModule,

    IgxNavbarModule, IgxListModule,
    IgxNavigationDrawerModule,
} from "igniteui-angular";
import { IgxGridModule } from "igniteui-angular";

import { GridPositionsComponent } from "./grid-positions.component";

@NgModule({
    declarations: [
        GridPositionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

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
    ],
})
export class GridPositionsModule { }
