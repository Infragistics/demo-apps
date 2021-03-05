import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import {
    IgxButtonModule, IgxIconModule, IgxInputGroupModule,
    IgxLayoutModule, IgxRippleModule,   IgxSwitchModule
} from "igniteui-angular";

import { ExplorerActionsComponent } from "./explorer-actions.component";

@NgModule({
    declarations: [
        ExplorerActionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        IgxButtonModule,
        IgxRippleModule,
        IgxIconModule,
        IgxLayoutModule,
        IgxInputGroupModule,
        IgxSwitchModule
    ],
})
export class ExplorerActionsModule { }
