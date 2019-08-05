import * as React from "react";
import { Switch, Route } from "react-router-dom"

import "./AppRouter.css";
import MasterView from "./MasterView";
import DetailView from "./DetailView";
import AppView from "../views/AppView";
import Page from "./Page";

import DataUtil from "../data/DataUtil";

export default class AppRouter extends React.Component<any, any> {

    public static basename: string = "/react-master-detail";

    public static salesPeople: any[] = DataUtil.getEmployees(20);

    public Routes: any[];
    public RouteElements:  JSX.Element[];
    public RouteLinks: JSX.Element[];

    constructor(props: any) {
        console.log("App...");
        super(props);
        this.Routes = [];
        this.Routes.push(this.create(Page, "/", true));
        this.Routes.push(this.create(Page, "/person/:ID", true));
        this.Routes.push(this.create(MasterView));
        this.Routes.push(this.create(DetailView));
        this.Routes.push(this.create(AppView));

        this.RouteElements = this.Routes.map(r => r.element );
        this.RouteLinks = this.Routes.map(r => r.link );
    }

    public create(comp: any, path?: string, isExact?: boolean): any {
        if (path === undefined) {
            path = "/" + comp.name.toString();
        }
        if (isExact === undefined) {
            isExact = true;
        }
        let lbl: string = comp.name.toString();
        lbl = lbl.replace("", "");

        let data = {
            label: lbl,
            // path: path,
            link: <div key={path}><a href={path}>{lbl}</a></div>,
            element: <Route exact={isExact} path={path} key={lbl} component={comp}/>
        }
        return data;
    }

    public render() {
        console.log("App... rendering");

        return (
            <div className="navRoot">
                <div className="navBar">
                    <label>App Routes</label>
                    {this.RouteLinks}
                 </div>
                <div className="navSwitch">
                    <Switch>
                        {this.RouteElements}
                    </Switch>
                </div>
            </div>
        );
    }

}


