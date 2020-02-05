// tslint:disable:max-line-length
import { NgModule } from "@angular/core";
import { NavigationStart, Router, RouterModule, Routes } from "@angular/router";
import "rxjs/add/operator/filter";

import { HomeComponent } from "./home/home.component";
import { IndexComponent } from "./index/index.component";
import { ContainerComponent } from "./index/container.component";

export const samplesRoutes: Routes = [
    {
        component: HomeComponent,
        data: { displayName: "Home" },
        path: "home"
    },
    {
        data: ["GridModule"],
        loadChildren: () => import("./grids/grid.module").then(m => m.GridModule),
        path: "grids"
    },
    {
        data: ["PageModule"],
        loadChildren: () => import("./charts/chart.module").then(m => m.ChartModule),
        path: "charts"
    },
    {
        data: ["PageModule"],
        loadChildren: () => import("./explorer/explorer.module").then(m => m.ExplorerModule),
        path: "explorer"
    },
];
export const appRoutes: Routes = [
    {
        path: "", pathMatch: "full", redirectTo: "/home"
    },
    {
        children: samplesRoutes,
        component: ContainerComponent,
        path: ""
    },
    {
        children: samplesRoutes,
        component: IndexComponent,
        path: "samples"
    }
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {

    constructor(private router: Router) {

        // console.log("app routing (): \n" + router.url)
        router.events
            .filter((event) => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                console.log("app routing NavigationStart: \n" + event.url)
                this.setOverflow(event.url);
            });
    }

    public setOverflow(url: string) {
        if (url.endsWith("finjs-sample")) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }
}
