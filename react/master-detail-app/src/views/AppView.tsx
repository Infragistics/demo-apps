import * as React from "react";

// grid modules:
import { IgrLiveGridModule } from 'igniteui-react-grids/ES5/igr-live-grid-module';
import { IgrLiveGrid } from "igniteui-react-grids/ES5/igr-live-grid";
import { IgrTextColumn } from 'igniteui-react-grids/ES5/igr-text-column';
import { IgrNumericColumn } from 'igniteui-react-grids/ES5/igr-numeric-column';
import { IgrDateTimeColumn } from 'igniteui-react-grids/ES5/igr-date-time-column';
import { IgrImageColumn } from 'igniteui-react-grids/ES5/igr-image-column';
import { ColumnGroupDescription } from 'igniteui-react-grids/ES5/igr-column-group-description';
import { ListSortDirection } from "igniteui-react-core/ES5/ListSortDirection";

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

import './MasterView.css'
import './DetailView.css'
import WorldUtils from "../data/WorldUtils"
import DataUtil from "../data/DataUtil";

export default class AppView extends React.Component<any, any> {

    public static basename: string = "/react-master-detail";

    public map: IgrGeographicMap;
    public grid: IgrLiveGrid;
    public salesPeople: any[];
    public salesList: JSX.Element[] = [];

    public sizeScale: IgrSizeScale;
    public fillScale: IgrValueBrushScale;

    constructor(props: any) {
        super(props);
        console.log("App... ");

        this.onMapRef = this.onMapRef.bind(this);
        this.onGridRef = this.onGridRef.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onMasterItemClick = this.onMasterItemClick.bind(this);

        this.sizeScale = new IgrSizeScale({});
        this.sizeScale.minimumValue = 5;
        this.sizeScale.maximumValue = 25;

        const brushes = [
            "rgba(252, 32, 32, 0.4)",  // semi-transparent red
            "rgba(252, 170, 32, 0.4)", // semi-transparent orange
            "rgba(14, 194, 14, 0.4)",  // semi-transparent green
        ];
        this.fillScale = new IgrValueBrushScale({});
        this.fillScale.brushes = brushes;
        this.fillScale.minimumValue = 20000;
        this.fillScale.maximumValue = 100000;

        this.salesPeople = DataUtil.getEmployees(100);
        this.salesList = [];
        for (let i = 0; i < this.salesPeople.length; i++) {
            const person =  this.salesPeople[i];
            this.salesList.push(this.renderItem(person, i));
        }

        // defaulting to first person in the array of sales people
        this.state = { salesData: this.salesPeople[0].Sales,};
    }

    public render() {
        console.log("App... render");

        return (
            <div className="container">
                <div  className="masterView">
                    <div className="masterHeader">
                        <img src={this.getHeaderIcon()}/>
                        <label>Global Sales Team</label>
                    </div>
                    <div className="masterList">
                        <div>{this.salesList}</div>
                    </div>
                </div>

                <div className="detailView">
                    {/* <div className="map" >
                    </div> */}
                    <div className="map">
                        <IgrGeographicMap
                            ref={this.onMapRef}
                            width="100%"
                            height="100%"
                            zoomable="true" >

                            <IgrGeographicProportionalSymbolSeries name="sales"
                            dataSource={this.state.salesData}
                            radiusScale={this.sizeScale}
                            fillScale={this.fillScale}
                            fillMemberPath="OrderValue"
                            radiusMemberPath="OrderValue"
                            latitudeMemberPath="Lat"
                            longitudeMemberPath="Lon"
                            markerOutline="rgba(0,0,0,0.2)"
                            markerType="Circle"
                            tooltipTemplate={this.onSeriesTooltipCreate}  />

                        </IgrGeographicMap>
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
                            columnShowingAnimationMode="slideFromRightAndFadeIn"
                            columnHidingAnimationMode="slideToRightAndFadeOut"
                            columnPropertyUpdatingAnimationMode="Interpolate"
                            dataSource={this.state.salesData}>
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
            </div>
        );
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
        this.map.zoomToGeographic({ left: -120, top: -30, width: 180, height: 90});

        // this.map.windowRect = { left: 0.25, top: 0.1, width: 0.5, height: 0.5 };
    }

    public onSeriesAdd(locations: any[])
    {
        const symbolSeries = new IgrGeographicProportionalSymbolSeries ( { name: "symbolSeries" });
        symbolSeries.dataSource = locations;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.radiusScale = this.sizeScale;
        symbolSeries.fillScale = this.fillScale;
        symbolSeries.fillMemberPath = "OrderValue";
        symbolSeries.radiusMemberPath = "OrderValue";
        symbolSeries.latitudeMemberPath = "Lat";
        symbolSeries.longitudeMemberPath = "Lon";
        symbolSeries.markerOutline = "rgba(0,0,0,0.2)";
        symbolSeries.tooltipTemplate = this.onSeriesTooltipCreate;

        this.map.series.add(symbolSeries);
    }

    public onSeriesTooltipCreate(context: any) {
        const dataContext = context.dataContext as DataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item as any;
        if (!dataItem) return null;

        const val = dataItem.OrderValue.toFixed(0);
        const lat = WorldUtils.toStringLat(dataItem.Lat);
        const lon = WorldUtils.toStringLon(dataItem.Lon);

        return <div>
            <div className="tooltipBox">
                <div className="tooltipTitle" >{dataItem.City}, {dataItem.CountryName}</div>

                {/* <div className="tooltipRow">
                    <div className="tooltipLbl">City:</div>
                    <div className="tooltipVal">{dataItem.City}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Country:</div>
                    <div className="tooltipVal">{dataItem.CountryName}</div>
                </div> */}
                <div className="tooltipRow">
                    <div className="tooltipLbl">Latitude:</div>
                    <div className="tooltipVal">{lat}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Longitude:</div>
                    <div className="tooltipVal">{lon}</div>
                </div>
                {/* <div className="tooltipRow">
                    <div className="tooltipLbl">Location:</div>
                    <div className="tooltipVal">{lon} {lat}</div>
                </div> */}
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

    // master

    public onMasterItemClick(event: React.MouseEvent) {
        event.preventDefault();
        console.log("onMasterItemClick " + event.currentTarget.id);
        const newId = event.currentTarget.id;
        const newData = this.salesPeople[newId].Sales;

        this.grid.scrollToRowByIndex(0);
        this.setState({salesData: newData});

        // for (let i = 0; i < this.state.data.length; i++)
        // {
        //     let oldItem = this.state.data[i];
        //     let newItem = newData[i];
        //     this.grid.notifyRemoveItem(i, oldItem);
        //     // FinancialData.randomizeDataValues(item);
        //     this.grid.notifyInsertItem(i, newItem);
        // }

        // for (let i = this.state.data.length - 1; i >= 1; i--)
        // {
        //     let oldItem = this.state.data[i];
        //     this.grid.notifyRemoveItem(i, oldItem);
        // }

        // for (let i = 0; i < newData.length; i++)
        // {
        //     let newItem = newData[i];
        //     this.grid.notifyInsertItem(i, newItem);
        // }
    }

    public renderItem(person: any, index: number): JSX.Element {
        const imageSize = 50;
        const borderSize = imageSize / 2.0;
        const avatarStyle = {
            backgroundImage: "url(" + person.Avatar + ")",
            width: imageSize.toString() + "px",
            height: imageSize.toString() + "px",
            borderRadius: borderSize.toString() + "px",
        } as React.CSSProperties;

        let div =
        // <a href={`/person/${person.ID}`} key={'item' + person.ID}>
            <button className="masterListButton" onClick={this.onMasterItemClick} id={person.ID} key={'item' + index} >
                <div className="masterListItem" >
                    <div className="masterListAvatar" style={avatarStyle}/>
                    <div className="masterListInfo"  >
                        {/* <a href={`/person/${person.ID}`} key={'item' + person.ID}>Name {person.Name}</a> */}
                        <span className="masterListInfoName">{person.Name}</span>
                        <span>
                            <img src={this.getUserIcon()}/>
                            <label>{person.Title}</label>
                        </span>
                        <span>
                            <img src={this.getLocationIcon()}/>
                            <label>{person.City + ", " + person.CountryName}</label>
                        </span>
                    </div>
                </div>
            </button>
        // </a>
        return div;
    }

    public getHeaderIcon(): string {
        return require('../assets/ig.png');
    }
    public getUserIcon(): string {
        return require('../assets/contacts/user.png');
    }
    public getPhoneIcon(): string {
        return require('../assets/contacts/telephone.png');
    }
    public getLocationIcon(): string {
        return require('../assets/contacts/location.png');
    }
    public getEmailIcon(): string {
        return require('../assets/contacts/email.png');
    }
}