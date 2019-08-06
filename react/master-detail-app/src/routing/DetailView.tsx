import * as React from "react";
import App from './AppRouter'

// grid modules:
import { IgrLiveGridModule } from 'igniteui-react-grids/ES5/igr-live-grid-module';
import { IgrLiveGrid } from "igniteui-react-grids/ES5/igr-live-grid";
import { IgrTextColumn } from 'igniteui-react-grids/ES5/igr-text-column';
import { IgrNumericColumn } from 'igniteui-react-grids/ES5/igr-numeric-column';
import { IgrDateTimeColumn } from 'igniteui-react-grids/ES5/igr-date-time-column';
import { IgrImageColumn } from 'igniteui-react-grids/ES5/igr-image-column';
import { ColumnGroupDescription } from 'igniteui-react-grids/ES5/igr-column-group-description';
import { ListSortDirection } from "igniteui-react-core/ES5/ListSortDirection";
import { GridSelectedItemsChangedEventArgs } from 'igniteui-react-grids/ES5/igr-grid-selected-items-changed-event-args';

// map modules:
import { IgrGeographicMapModule } from "igniteui-react-maps/ES5/igr-geographic-map-module";
import { IgrGeographicMap } from "igniteui-react-maps/ES5/igr-geographic-map";
import { IgrGeographicProportionalSymbolSeries } from "igniteui-react-maps/ES5/igr-geographic-proportional-symbol-series";
import { IgrDataChartInteractivityModule } from "igniteui-react-charts/ES5/igr-data-chart-interactivity-module";
import { IgrValueBrushScale } from "igniteui-react-charts/ES5/igr-value-brush-scale";
import { IgrSizeScale } from "igniteui-react-charts/ES5/igr-size-scale";
import { DataContext } from 'igniteui-react-core/ES5/igr-data-context';
import { MarkerType } from "igniteui-react-charts/ES5/MarkerType";

IgrDataChartInteractivityModule.register();
IgrGeographicMapModule.register();
IgrLiveGridModule.register();

import '../views/DetailView.css'
import WorldUtils from "../data/WorldUtils"

export default class DetailView extends React.Component {

    public map: IgrGeographicMap;
    public grid: IgrLiveGrid;
    public data: any[];

    constructor(props: any) {
        super(props);

        this.onMapRef = this.onMapRef.bind(this);
        this.onGridRef = this.onGridRef.bind(this);
        this.onLoad = this.onLoad.bind(this);

        this.data = App.salesPeople[0].Sales;
        console.log("DetailView... ");
    }

    public render() {
        console.log("DetailView... render");

        return (
            <div className="detailView">
                <div className="map" >
                    <IgrGeographicMap
                        ref={this.onMapRef}
                        width="100%"
                        height="100%"
                        zoomable="true" />
                </div>
                <div className="grid">
                    <IgrLiveGrid
                        ref={this.onGridRef}
                        height="100%"
                        width="100%"
                        selectionMode="SingleRow"
                        rowHeight="35"
                        headerHeight="35"
                        autoGenerateColumns="false"
                        selectedItemsChanged={this.selectedItemsChanged}
                        dataSource={this.data}>
                        <IgrTextColumn propertyPath="ID" width="*>70"/>
                        <IgrDateTimeColumn propertyPath="OrderDate" headerText="Date"  width="*>100" horizontalAlignment="right" />
                        <IgrNumericColumn propertyPath="OrderPrice" headerText="Price" width="*>90" positivePrefix="$" maxFractionDigits="0"/>
                        <IgrNumericColumn propertyPath="OrderCount" headerText="Orders" width="*>80"/>
                        <IgrNumericColumn propertyPath="OrderValue" headerText="Order Value" width="*>110" positivePrefix="$" showGroupingSeparator="true"/>
                        <IgrImageColumn propertyPath="CountryFlag" headerText="Country" horizontalAlignment="center"  width="90"/>
                        <IgrTextColumn propertyPath="City" width="*>150"/>
                    </IgrLiveGrid>
                </div>
            </div>
        );
    }

    public selectedItemsChanged(s: IgrLiveGrid, e: GridSelectedItemsChangedEventArgs) {
        console.log("selectedItemsChanged");
    }

    public componentDidMount() {
        window.addEventListener('load', this.onLoad);
    }

    public onLoad() {
        if (this.grid === undefined) {
            return;
        }

        const group = new ColumnGroupDescription();
        group.propertyPath = "Region";
        group.displayName = "Region";
        group.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(group);
    }

    public onGridRef(grid: IgrLiveGrid) {
        this.grid = grid;
    }

    public onMapRef(map: IgrGeographicMap) {
        this.map = map;
        this.map.windowRect = { left: 0.3, top: 0.1, width: 0.5, height: 0.6 };

        this.addSeriesWith(this.data);
    }

    public addSeriesWith(locations: any[])
    {
        const sizeScale = new IgrSizeScale({});
        sizeScale.minimumValue = 5;
        sizeScale.maximumValue = 25;

        const brushes = [
            "rgba(252, 32, 32, 0.4)",  // semi-transparent red
            "rgba(252, 170, 32, 0.4)", // semi-transparent orange
            "rgba(14, 194, 14, 0.4)",  // semi-transparent green
        ];

        const brushScale = new IgrValueBrushScale({});
        brushScale.brushes = brushes;
        brushScale.minimumValue = 20000;
        brushScale.maximumValue = 100000;

        const symbolSeries = new IgrGeographicProportionalSymbolSeries ( { name: "symbolSeries" });
        symbolSeries.dataSource = locations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.radiusScale = sizeScale;
        symbolSeries.fillScale = brushScale;
        symbolSeries.fillMemberPath = "OrderValue";
        symbolSeries.radiusMemberPath = "OrderValue";
        symbolSeries.latitudeMemberPath = "Lat";
        symbolSeries.longitudeMemberPath = "Lon";
        symbolSeries.markerOutline = "rgba(0,0,0,0.2)";
        symbolSeries.tooltipTemplate = this.createTooltip;

        this.map.series.add(symbolSeries);
    }

    public createTooltip(context: any) {
        const dataContext = context.dataContext as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const val = dataItem.OrderValue.toFixed(0);
        const lat = WorldUtils.toStringLat(dataItem.Lat);
        const lon = WorldUtils.toStringLon(dataItem.Lon);

        return <div>
            <div className="tooltipBox">
                <div className="tooltipRow">
                    <div className="tooltipLbl">City:</div>
                    <div className="tooltipVal">{dataItem.City}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Country:</div>
                    <div className="tooltipVal">{dataItem.CountryName}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Latitude:</div>
                    <div className="tooltipVal">{lat}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Longitude:</div>
                    <div className="tooltipVal">{lon}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Orders:</div>
                    <div className="tooltipVal">{dataItem.OrderCount}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Order Value:</div>
                    <div className="tooltipVal">{val}</div>
                </div>
            </div>
        </div>
    }
}