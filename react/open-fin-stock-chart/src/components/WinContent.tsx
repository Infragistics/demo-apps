import React from 'react';

import Win from './WinStyles';
import WinActions from './WinActions';
import WinTooltip from './WinTooltip';
import StockFinder from "./StockFinder";
import { StocksUtility } from "../tools/StocksUtility";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import * as IconExplode from '@material-ui/icons/DesktopWindows';
import * as IconUndock from '@material-ui/icons/Dashboard';
import * as IconDelete from '@material-ui/icons/Clear';
import * as IconMenu from '@material-ui/icons/Menu';
import * as IconSettings from '@material-ui/icons/Settings';
import * as IconChartType from '@material-ui/icons/BarChart';
import * as IconTrendType from '@material-ui/icons/ShowChart';
import * as IconIndicatorMode from '@material-ui/icons/NetworkCheck';
import * as IconOverlayMode from '@material-ui/icons/Layers';
import * as IconSend from '@material-ui/icons/Mail';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import classNames from 'classnames';

import { IgrZoomSlider } from "igniteui-react-charts/ES5/igr-zoom-slider";
import { IgrZoomSliderModule } from "igniteui-react-charts/ES5/igr-zoom-slider-module";
import { IgrFinancialChart } from "igniteui-react-charts/ES5/igr-financial-chart";
import { IgrFinancialChartModule } from "igniteui-react-charts/ES5/igr-financial-chart-module";

import { FinancialIndicatorType } from "igniteui-react-charts/ES5/FinancialIndicatorType";
import { TrendLineType } from "igniteui-react-core/ES5/TrendLineType";
import { ChartSeriesEventArgs } from 'igniteui-react-charts/ES5/igr-chart-series-event-args';
import { IgrCrosshairLayer } from 'igniteui-react-charts/ES5/igr-crosshair-layer';
import { IgrDomainChart } from 'igniteui-react-charts/ES5/igr-domain-chart';
import { IgrFinancialPriceSeries } from 'igniteui-react-charts/ES5/igr-financial-price-series';
import { AssigningCategoryStyleEventArgs } from 'igniteui-react-charts/ES5/igr-assigning-category-style-event-args';
import { IgrFinancialSeries } from 'igniteui-react-charts/ES5/igr-financial-series';
import { PriceDisplayType } from 'igniteui-react-charts/ES5/PriceDisplayType';
import { IgrColumnSeries } from 'igniteui-react-charts/ES5/igr-column-series';
import { IgrLineSeries } from 'igniteui-react-charts/ES5/igr-line-series';
import { IgrBollingerBandsOverlay } from "igniteui-react-charts/ES5/igr-bollinger-bands-overlay";
import { IgrPriceChannelOverlay } from "igniteui-react-charts/ES5/igr-price-channel-overlay";

import { IgrCalloutLayer } from "igniteui-react-charts/ES5/igr-callout-layer";
import { IgrFinalValueLayer } from "igniteui-react-charts/ES5/igr-final-value-layer";
import { FinancialOverlayType } from 'igniteui-react-charts/ES5/FinancialOverlayType';

IgrFinancialChartModule.register();
IgrZoomSliderModule.register();

const StockMenuWidth = 270;
const ChartMenuWidth = 270;
const toolbarHeight = Win.ToolbarSize + 4; //40;
const toolbarOffset = (toolbarHeight * 1) + 5

const styles = (theme: Theme) => ({
    // root: {
    //   display: 'flex',
    //   width: "100%",
    // },

    hide: {
      display: 'none',
    },
    toolbar: {
        width: "100%",
        minHeight: 10,
        height: toolbarHeight,
        padding: 0,
        paddingTop: 4,
        margin: 0,
        verticalAlign: 'center',
    },

    inputRoot: {
      width: '100%',
      fontSize: 11,
      color: 'inherit',
    },
    inputInput: {
      verticalAlign: 'center',
      paddingTop: 0,
      paddingRight: 6,
      paddingBottom: 2,
      paddingLeft: 6,
    },
    StockMenuDrawer: {
      width: StockMenuWidth,
    },
    StockMenuContent: {
      width: StockMenuWidth,
      marginTop: toolbarOffset,
      height: `calc(100% - ${toolbarOffset}px)`,
    //   background: "orange",
    //   background: Win.Colors.Background,
      background: Win.Colors.ToolbarBackground,
      opacity: 1.0,
    },
    StockMenuBadge: {
        top: '50%',
        right: 0,
        fontSize: Win.FontSize + 1,
        fontWeight: 800,
        padding: 4,
        minWidth: 23,
        minHeight: 23,
        // width: Win.FontSize * 2,
        // height: Win.FontSize * 2,
        backgroundColor: Win.Colors.Highlight,
        // color: Win.Colors.Foreground,
        color: "White",
        border: "2px solid " + Win.Colors.Background,
    },

    chartSettingsDrawer: {
      width: ChartMenuWidth,
      display: "flex",
    },
    chartSettingsOpen: {
      width: ChartMenuWidth,
      marginTop: toolbarOffset + 2,
      background: "blue",
      opacity: 0.6,
      overflow: "hidden",
      display: "flex",
    },
    chartSettingsClosed: {
      display: "none",
      width: ChartMenuWidth,
      marginTop: toolbarOffset + 2,
      background: "blue",
      opacity: 0.4,
      overflow: "hidden",
    },
    content: {
        overflow: "hidden",
        padding: 0,
        background: "transparent",
        // height: "100%",
        height: `calc(100% - ${toolbarOffset + 4}px)`,
        // marginLeft: 0,
        // flexGrow: 1,toolbarHeight
        // padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        // marginBottom: 10,
    },
    contentShift: {
        overflow: "hidden",
        padding: 0,
        background: "transparent",
        // height: "100%",
        height: `calc(100% - ${toolbarOffset + 4}px)`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: StockMenuWidth,
        // marginBottom: 10,
    },
  });

class WinContent extends React.Component<any, any> {

    public stockColors: string[] = ["#a76cff", "#c4dd35", "#f96232", "#3cbdc9", "#dc3f76", "#ff9800", "#6178f8", "#54c25a", "#aaaaaa"];
    public stockFills: string[] = ["#a76cff6b", "#c4dd356b", "#f962326b", "#3cbdc96b", "#dc3f766b", "#ff98006b", "#6178f86b", "#54c25a6b", "#aaaaaa6b"];

    public stockDefaults: string[] = ["TSLA", "MSFT", "TWTR", "FB"];

    public IndicatorModes: string[] = [];
    public TrendlineModes: string[] = [];
    public OverlayModes: string[] = [];
    public OverlayAddedCount: number = 0;
    public AxisModes: string[] = ["Numeric", "PercentChange"];

    constructor(props: any) {
        super(props);

        let symbols = this.stockDefaults;
        if (this.props.StockSymbols) {
            symbols = this.props.StockSymbols.split(',');
        }
        console.log("WinContent() " + symbols.length + " symbols:" + symbols);

        const stocks = StocksUtility.GetStocksData(symbols);
        const stocksSource: any[] = []
        for (let i = 0; i < stocks.length; i++) {
            stocks[i].color = this.getStockColor(i);
            stocksSource.push(stocks[i].data);
        }

        this.TrendlineModes = this.getEnumKeys(TrendLineType);
        this.IndicatorModes = this.getEnumKeys(FinancialIndicatorType);
        this.IndicatorModes.unshift("None");
        this.OverlayModes = this.getEnumKeys(FinancialOverlayType);
        this.OverlayModes.unshift("None");

        const stocksOpen = this.props.StockMenuOpen !== undefined ? this.props.StockMenuOpen : true;
        const stocksCount = stocksOpen ? 0 : stocks.length;
        const stockTitle = symbols.join(', ');

        this.state = {
            StockCountAdded: stocksCount,
            StockSymbols: symbols,
            StockTitle: stockTitle,
            StockData: stocks,
            StockSources: stocksSource,
            StockMenuOpen: stocksOpen,

            chartSettingsOpen: false,

            chartTypeActive: null,
            chartTypeMode: "Lines",
            chartTypeOptions: this.chartTypeOptions.Lines,
            zoomSliderVisible: true,
            zoomSliderType: "Line",

            trendlineActive: null,
            trendlineMode: "None",

            IndicatorModePending: null,
            IndicatorModeSelected: "None",
            IndicatorTypes: [],

            OverlayModePending: null,
            OverlayModeSelected: "None",
            OverlayTypes: [],

            AxisModePending: null,
            AxisModeSelected: "Numeric",
            AxisIsLogarithmic: false,
        };

        this.onStockRemoved = this.onStockRemoved.bind(this);
        this.onStockAdded = this.onStockAdded.bind(this);

        this.onChartRef = this.onChartRef.bind(this);
        this.onChartTypeSelected = this.onChartTypeSelected.bind(this);
        this.onTrendlineSelected = this.onTrendlineSelected.bind(this);
        this.onRenderStockMenuItems = this.onRenderStockMenuItems.bind(this);
        this.onSeriesAdded = this.onSeriesAdded.bind(this);
        this.onSeriesRemoved = this.onSeriesRemoved.bind(this);
        this.onFormatYAxisLabel = this.onFormatYAxisLabel.bind(this);

        this.initializeFDC3()
    }

    toggleStockMenu = () => () => {
        console.log("StockMenuOpen " + !this.state.StockMenuOpen);
        if (this.state.StockMenuOpen) {
            this.setState({ StockMenuOpen: false });
        } else {
            this.setState({ StockMenuOpen: true, StockCountAdded: 0 });
        }
    };

    toggleChartSettings = () => () => {
        console.log("chartSettingsOpen " + !this.state.chartSettingsOpen);
        if (this.state.chartSettingsOpen) {
            this.setState({ chartSettingsOpen: false });
        } else {
            this.setState({ chartSettingsOpen: true });
        }
    };

    onStockSelected = (symbol: string) => () => {
        console.log("StockMenu select " + symbol);
        for (let stock of this.state.StockData) {
            if (stock.symbol === symbol) {
                stock.selected = !stock.selected;
            }
        }

        this.setState({
            StockData: this.state.StockData
        });
    };

    getStockColor(i: number): string {
        const color = this.stockColors[i % this.stockColors.length];
        return color;
    }
    getOverlayColor(i: number): string {
        const brushes = this.state.chartTypeOptions.positiveBrushes;
        const color = brushes[i % brushes.length];
        return color;
    }

    onStockRemoved(e: React.MouseEvent, symbol: string) {

        e.stopPropagation();

        const orgNames = this.state.StockSymbols.length;
        const orgStocks = this.state.StockData.length;
        const orgSources = this.state.StockSources.length;

        console.log("StockMenu remove " + symbol);
        const newNames = this.state.StockSymbols.filter(function(stock: any, i: number){
            return stock !== symbol;
        });
        const newStocks = this.state.StockData.filter(function(stock: any, i: number){
            return stock.symbol !== symbol;
        });

        const newSource: any[] = [];
        for (let i = 0; i < newStocks.length; i++) {
            newStocks[i].color = this.getStockColor(i);
            newSource.push(newStocks[i].data);
        }

        console.log("StockMenu StockSymbols " + orgNames + " -> " + newNames.length);
        console.log("StockMenu StockData " + orgStocks + " -> " + newStocks.length);
        console.log("StockMenu StockSources " + orgSources + " -> " + newSource.length)

        const title = newNames.join(', ');
        this.setState({
            StockTitle: title,
            StockSymbols: newNames,
            StockData: newStocks,
            StockSources: newSource
        });

    }

    onStockExplode(e: React.MouseEvent, symbol: string) {
        e.stopPropagation();
        WinActions.explode(symbol);
    }

    onStockAdded(symbols: string[]) {

        let newStockCount = this.state.StockCountAdded;
        let newStockFound = false;

        const crrStocks = this.state.StockData;
        const crrSymbols = this.state.StockSymbols;

        const crrSources: any[] = [];
        for (let i = 0; i < this.state.StockSources.length; i++) {
            crrSources.push(this.state.StockSources[i]);
        }

        const newSymbols: string[] = [];
        for (const symbol of symbols) {
            const info = StocksUtility.GetStockInfo(symbol);
            if (info === null) {
                console.log("onStockAdded info is null for symbol: " + symbol);
            } else if (this.state.StockSymbols.indexOf(symbol) >= 0) {
                console.log("onStockAdded already exist symbol: " + symbol);
            } else {
                newStockFound = true;
                newStockCount++;

                const stock = StocksUtility.GetStock(symbol);
                stock.color = this.getStockColor(crrSymbols.length);
                crrStocks.push(stock);
                crrSources.push(stock.data);
                crrSymbols.push(symbol);
                newSymbols.push(symbol);
            }
        }

        if (newStockFound) {
            console.log("onStockAdded " + newSymbols.length + "symbols: " + newSymbols);

            if (this.state.StockMenuOpen) {
                newStockCount = 0;
            }

            const crrTitle = crrSymbols.join(', ');
            this.setState({
                StockTitle: crrTitle,
                StockSymbols: crrSymbols,
                StockData: crrStocks,
                StockSources: crrSources,
                StockCountAdded: newStockCount,
            });
        }
    }

    onRenderStockMenuItems() {
        const actionsVisible = "visible"; // this.state.StockSymbols.length > 1 ? "visible" : "hidden";
        console.log("onRenderStockMenuItems");
        const listItems: any[] = this.state.StockData.map((stock: any) =>
            <div key={stock.symbol}
            onClick={this.onStockSelected(stock.symbol)}
            // style={{opacity: stock.selected ? 0.6 : 1.0}}
            style={{background: stock.selected ? Win.Colors.StockSelected :  Win.Colors.StockNormal}}
            className="StockMenuItem" >

                <div className="StockMenuItemBadge"
                     style={{background: stock.color}}>
                </div>

                <div className="StockMenuItemName" >
                    {stock.label}
                </div>
                <div className="StockMenuItemPriceValue">
                    ${stock.price.toFixed(2)}
                </div>
                <div
                style={{color: stock.priceChange > 0 ? Win.Colors.Positive : Win.Colors.Negative}}
                className="StockMenuItemPriceChange">
                    {StocksUtility.toStringChange(stock.priceChange)}
                    {" (" + stock.pricePercentage.toFixed(1) + "%)"}
                </div>
                <div className="StockMenuItemActions"
                     style={{visibility: actionsVisible}}>
                    <IconButton
                        onClick={(e) => { this.onStockRemoved(e, stock.symbol)}}
                        className="StockMenuItemButton"
                        style={Win.Styles.ButtonDelete}>
                        <WinTooltip
                        position={'topLeft'}
                         message="Remove this stock and corresponding stock chart">
                            <IconDelete.default style={Win.Styles.IconDelete}/>
                        </WinTooltip>
                    </IconButton>
                    {/* <IconButton
                        onClick={(e) => { this.onStockExplode(e, stock.symbol)}}
                        className="WinToolbarButton" style={Win.Styles.ButtonExplode}>
                        <WinTooltip
                        position={'topLeft'}
                        message="Open selected stock(s) in a new dockable window">
                            <IconExplode.default style={Win.Styles.Icon}/>
                        </WinTooltip>
                    </IconButton> */}
                    <IconButton
                        onClick={(e) => { this.onStockSend(e, [stock.symbol])}}
                        className="StockMenuItemButton" style={Win.Styles.ButtonSend}>
                        <WinTooltip
                        position={'topLeft'}
                        message="Send this stock as FDC3 message to other apps that subscribe to 'ViewChart' intent">
                            <IconSend.default style={Win.Styles.IconSend}/>
                        </WinTooltip>
                    </IconButton>
                </div>
            </div>
        );
        return listItems;
    }

    render() {

        console.log("WinContent render");
        const { classes } = this.props;

        const ChartMenu = (
            <div >
                <div > ChartMenu 1</div>
                <div > ChartMenu 2</div>
                <div > ChartMenu 3</div>
                <div > ChartMenu 4</div>
            </div>
        );
        return (
            <div className="WinChartFrame">

                    <div className="AppToolbarWrapper">
                        {/* <AppBar
                        position="fixed" color="primary"
                        className={this.props.classes.appBar}> */}
                            <Toolbar
                            className={this.props.classes.toolbar}
                            disableGutters={!this.state.StockMenuOpen}>

                                <div className="AppToolbarContent">
                                    <WinTooltip
                                    position={'bottomLeft'}
                                    message="Toggle visibility of stocks menu list">
                                        <IconButton
                                        className="WinToolbarButton" style={Win.Styles.ButtonMenu}
                                        onClick={this.toggleStockMenu()}>
                                            <Badge badgeContent={this.state.StockCountAdded}
                                                classes={{badge: classes.StockMenuBadge}}>
                                                    <IconMenu.default style={Win.Styles.IconBadge}/>
                                            </Badge>
                                        </IconButton>
                                    </WinTooltip>

                                    <WinTooltip
                                    position={'bottomLeft'}
                                    message="Open this app with default stocks in a new dockable window">
                                        <IconButton
                                            className="WinToolbarButton" style={Win.Styles.ButtonExplode}
                                            onClick={(e) => { this.onStockExplode(e, "FB")}}>
                                                <IconExplode.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>

                                    <WinTooltip
                                    position={'bottomLeft'}
                                    message="Undock this window if it is docked to any other OpenFin window">
                                        <IconButton
                                            className="WinToolbarButton" style={Win.Styles.ButtonExplode}
                                            onClick={(e) => { WinActions.undock("")}}>
                                                <IconUndock.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>

                                    {/* <IconButton
                                    className="WinToolbarButton" style={Win.Styles.ButtonMenu} >
                                    <IconSearch.default style={Win.Styles.Icon}/></IconButton>*/}

                                    <div className="AppToolbarSearch">
                                        {/* <InputBase
                                         onChange={this.handleStockInputChanged}
                                        onKeyDown={this.handleStockInputPress}
                                        placeholder="Find stocks..."
                                        classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,}}/> theme={theme}*/}
                                        <StockFinder onChange={this.onStockAdded}/>
                                    </div>

                                    {/* Indicator Types  */}
                                    <WinTooltip
                                    position={'bottomRight'}
                                    message="Select indicator type">
                                        <IconButton
                                        className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                        onClick={this.onIndicatorModePending}>
                                                <IconIndicatorMode.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>
                                    <Menu id="chart-menu" color="secondary"
                                    className="AppToolbarMenu"
                                    open={Boolean(this.state.IndicatorModePending)}
                                    anchorEl={this.state.IndicatorModePending}
                                    onClose={this.onIndicatorModeCancel}
                                    disableAutoFocusItem={true}
                                    MenuListProps={{style: { padding: 0}}}
                                    PaperProps={{
                                        style: {
                                        maxHeight: 50 * 4,
                                        minWidth: 150,
                                        maxWidth: 200,
                                        padding: 0},
                                    }}>
                                    <div>
                                        <div className="AppToolbarMenuHeader">INDICATOR TYPE</div>
                                        {this.onIndicatorModesRendering()}
                                    </div>
                                    </Menu>

                                    {/* Overlay Types  */}

                                    <WinTooltip
                                    position={'bottomRight'}
                                    message="Select overlay type">
                                        <IconButton
                                        className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                        onClick={this.onOverlayModePending}>
                                                <IconOverlayMode.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>
                                    <Menu id="chart-menu" color="secondary"
                                    className="AppToolbarMenu"
                                    open={Boolean(this.state.OverlayModePending)}
                                    anchorEl={this.state.OverlayModePending}
                                    onClose={this.onOverlayModeCancel}
                                    disableAutoFocusItem={true}
                                    MenuListProps={{style: { padding: 0}}}
                                    PaperProps={{
                                        style: {
                                        maxHeight: 50 * 4,
                                        minWidth: 150,
                                        maxWidth: 200,
                                        padding: 0},
                                    }}>
                                    <div>
                                        <div className="AppToolbarMenuHeader">OVERLAY TYPE</div>
                                        {this.onOverlayModeRendering()}
                                    </div>
                                    </Menu>

                                    {/* Trendline Types */}
                                    <WinTooltip
                                        position={'bottomRight'}
                                        message="Select trend line type">
                                        <IconButton
                                        className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                        onClick={this.onTrendlineActive}>
                                                <IconTrendType.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>
                                    <Menu id="chart-menu" color="secondary"
                                    className="AppToolbarMenu"
                                    open={Boolean(this.state.trendlineActive)}
                                    anchorEl={this.state.trendlineActive}
                                    onClose={this.onTrendlineCancel}
                                    disableAutoFocusItem={true}
                                    MenuListProps={{style: { padding: 0}}}
                                    PaperProps={{
                                        style: {
                                        maxHeight: 50 * 4,
                                        padding: 0},
                                    }}>
                                    <div >
                                        <div className="AppToolbarMenuHeader">TREND LINE TYPE</div>
                                        {this.onTrendlineModesRendering()}
                                    </div>
                                    </Menu>

                                    {/* Chart Types  */}
                                    <IconButton
                                    className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                    onClick={this.onChartTypeActive}>
                                        <WinTooltip
                                        position={'bottomRight'}
                                        message="Select chart type">
                                            <IconChartType.default style={Win.Styles.Icon}/>
                                        </WinTooltip>
                                    </IconButton>
                                    <Menu id="chart-menu" color="secondary"
                                    className="AppToolbarMenu"
                                    open={Boolean(this.state.chartTypeActive)}
                                    anchorEl={this.state.chartTypeActive}
                                    onClose={this.onChartTypeCancel}
                                    disableAutoFocusItem={true}
                                    MenuListProps={{style: { padding: 0}}}
                                    PaperProps={{
                                        style: {
                                        maxHeight: 50 * 4,
                                        minWidth: 150,
                                        padding: 0},
                                    }}>
                                    <div>
                                        <div className="AppToolbarMenuHeader">CHART TYPE</div>
                                        {this.onChartTypesRendering()}
                                    </div>
                                    </Menu>

                                    {/* <IconButton
                                    className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                    onClick={this.onZoomSliderToggle}>
                                        <WinTooltip
                                        position={'bottomRight'}
                                        message="Toggle visibility of zoom slider">
                                            <IconChartType.default style={Win.Styles.Icon}/>
                                        </WinTooltip>
                                    </IconButton> */}


                                    {/* Y-Axis Types */}
                                    {/* <WinTooltip
                                        position={'bottomRight'}
                                        message="Select Y-Axis mode">
                                        <IconButton
                                        className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                        onClick={this.onAxisModePending}>
                                                <IconTrendType.default style={Win.Styles.Icon}/>
                                        </IconButton>
                                    </WinTooltip>
                                    <Menu id="chart-menu" color="secondary"
                                    className="AppToolbarMenu"
                                    open={Boolean(this.state.AxisModePending)}
                                    anchorEl={this.state.AxisModePending}
                                    onClose={this.onAxisModeCancel}
                                    disableAutoFocusItem={true}
                                    MenuListProps={{style: { padding: 0}}}
                                    PaperProps={{
                                        style: {
                                        maxHeight: 50 * 4,
                                        padding: 0},
                                    }}>
                                    <div >
                                        <div className="AppToolbarMenuHeader">AXIS MODES</div>
                                        {this.onAxisModesRendering()}
                                    </div>
                                    </Menu> */}

                                    {/* <IconButton
                                    className="WinToolbarButton" style={Win.Styles.ButtonSettings}
                                    onClick={this.toggleChartSettings()}>
                                    <IconSettings.default style={Win.Styles.Icon}/></IconButton> */}

                                </div>

                            </Toolbar>
                        {/* </AppBar> */}
                    </div>
                {/* </div> */}

                <Drawer
                variant="persistent"
                anchor="left"
                open={this.state.StockMenuOpen}
                className={this.props.classes.StockMenuDrawer}
                classes={{paper: this.props.classes.StockMenuContent}}>

                    {/* <div style={{background: "white", height: 600, margin: 6}}> */}
                        {this.onRenderStockMenuItems()}
                    {/* </div> */}
                </Drawer>
                <Drawer
                variant="persistent"
                anchor="right"
                open={this.state.chartSettingsOpen}
                // classes={{paper: this.props.classes.chartSettingsOpen}}
                className={this.props.classes.chartSettingsDrawer}
                classes={{paper: classNames(
                    classes.chartSettingsOpen, {
                   [classes.chartSettingsClosed]: !this.state.chartSettingsOpen})}}
                // className={classNames(
                //      classes.chartSettingsDrawer, {
                //     [classes.chartSettingsDrawerClosed]: this.state.chartSettingsOpen})}
                    >
                    {ChartMenu}
                </Drawer>

                <div className={classNames(classes.content, {
                    [classes.contentShift]: this.state.StockMenuOpen})}>

                        {/* <WinChart   /> */}
                        <div className="ChartTheme">

                            <IgrFinancialChart ref={this.onChartRef}
                            width="100%"
                            height="100%"
                            chartTitle={this.state.StockTitle}

                            markerTypes={this.state.chartTypeOptions.markerTypes}
                            markerBrushes={this.state.chartTypeOptions.markerBrushes}
                            markerOutlines={this.state.chartTypeOptions.markerOutlines}

                            indicatorTypes={this.state.IndicatorTypes}
                            indicatorNegativeBrushes="gray"
                            indicatorThickness={1.5}

                            overlayTypes={this.state.OverlayTypes}
                            overlayOutlines={this.state.chartTypeOptions.positiveOutlines}
                            overlayBrushes={this.state.chartTypeOptions.positiveBrushes}
                            overlayThickness={1.5}

                            trendLineThickness={1.5}
                            trendLineType={this.state.trendlineMode}
                            chartType={this.state.chartTypeOptions.chartType}
                            zoomSliderType={this.state.zoomSliderType}

                            brushes={this.state.chartTypeOptions.positiveBrushes}
                            outlines={this.state.chartTypeOptions.positiveOutlines}
                            negativeBrushes={this.state.chartTypeOptions.negativeBrushes}
                            negativeOutlines={this.state.chartTypeOptions.negativeOutlines}
                            thickness={this.state.chartTypeOptions.lineThickness}

                            isSeriesHighlightingEnabled={true}
                            crosshairsAnnotationEnabled={true}
                            crosshairsDisplayMode="Both"
                            isToolbarVisible={false}
                            finalValueAnnotationsVisible={true}

                            calloutsVisible={this.state.chartTypeOptions.calloutsVisible}
                            calloutsXMemberPath="Index"
                            calloutsYMemberPath="Value"
                            calloutsLabelMemberPath="Info"
                            calloutsContentMemberPath="Info"

                            seriesAdded={this.onSeriesAdded}
                            seriesRemoved={this.onSeriesRemoved}

                            dataSource={this.state.StockSources}
                            yAxisFormatLabel={this.onFormatYAxisLabel}
                            yAxisLabelRightMargin={0}

                            yAxisMode={this.state.AxisModeSelected}
                            yAxisIsLogarithmic={this.state.AxisIsLogarithmic}
                            />
                        </div>
                </div>
            </div>
        );
    }

    public onFormatYAxisLabel(item: number): string {
        return item.toFixed(0);
    }

    public onSeriesAdded(chart: IgrDomainChart, args: ChartSeriesEventArgs) {

        // TODO find a fix for series which do not have right colors when overlays are added

        if (args.series instanceof IgrFinancialPriceSeries) {
            const priceSeries = args.series as IgrFinancialPriceSeries;
            if (priceSeries.displayType == PriceDisplayType.Candlestick) {
                priceSeries.isCustomCategoryStyleAllowed = true;
                priceSeries.assigningCategoryStyle = (s: IgrFinancialSeries, e: AssigningCategoryStyleEventArgs) => {
                    if (this.state.chartTypeMode == "Boxes") {
                        e.fill = "transparent";
                    }
                }
            }
            priceSeries.negativeBrush = "gray";
            priceSeries.negativeOutline = "gray";
            priceSeries.isTransitionInEnabled = true;

        } else if (args.series instanceof IgrColumnSeries) {
            const series = args.series as IgrColumnSeries;
            series.isTransitionInEnabled = true;
            series.resolution = 8;

        } else if (args.series instanceof IgrLineSeries) {
            const series = args.series as IgrLineSeries;
            series.isTransitionInEnabled = true;

        } else if (args.series instanceof IgrFinalValueLayer) {
            const layer = args.series as IgrFinalValueLayer;
            layer.axisAnnotationTextColor = "Black";
            layer.axisAnnotationInterpolatedValuePrecision = 0;

        } else if (args.series instanceof IgrCalloutLayer) {
            const layer = args.series as IgrCalloutLayer;
            layer.calloutTextColor = "Black";

        } else if (args.series instanceof IgrCrosshairLayer) {
            const layer = args.series as IgrCrosshairLayer;
            layer.yAxisAnnotationTextColor = "Black";
            layer.xAxisAnnotationTextColor = "Black";
            layer.xAxisAnnotationBackground = "Gray";
            layer.verticalLineStroke = "Gray";
        } else if (
            args.series instanceof IgrBollingerBandsOverlay ||
            args.series instanceof IgrPriceChannelOverlay) {

            const overlayColor = this.getOverlayColor(this.OverlayAddedCount);
            args.series.areaFillOpacity = 0.25;
            // args.series.brush = overlayColor;
            // args.series.outline = overlayColor;

            this.OverlayAddedCount++;
        }

    }

    public onSeriesRemoved(chart: IgrDomainChart, args: ChartSeriesEventArgs) {
        if (args.series instanceof IgrFinancialPriceSeries) {
            if (args.series.isCustomCategoryStyleAllowed) {
                args.series.isCustomCategoryStyleAllowed = false;
                (args.series as any).assigningCategoryStyle = null;
            }
        }
    }

    public chart!: IgrFinancialChart;
    public onChartRef(chart: IgrFinancialChart) {
        this.chart = chart;
        this.updateChart();
    }

    public updateChart() {

    };

    onChartTypeActive = (event: any) => {
        console.log("onChartTypeActive..." + event);
        this.setState({ chartTypeActive: event.currentTarget });
    };
    onChartTypeCancel = (event: any) => {
        console.log("onChartTypeCancel...");
        this.setState({ chartTypeActive: null });
    };
    onChartTypeSelected = (event: any) => {
        const mode = event.currentTarget.id;
        console.log("onChartTypeSelected..." + mode);

        const chartOptions = this.chartTypeOptions[mode];
        const zoomSliderMode = this.state.zoomSliderVisible ? chartOptions.chartType : "None"
        this.setState({
            chartTypeActive: null,
            chartTypeMode: mode,
            chartTypeOptions: chartOptions,
            zoomSliderType: zoomSliderMode,
        }, this.updateChart);
    }

    onZoomSliderToggle = (event: any) => {
        console.log("onZoomSliderToggle..." + this.state.zoomSliderVisible);

        if (this.state.zoomSliderVisible) {
            this.setState({
                zoomSliderVisible: false,
                zoomSliderType: "None"
            });
        } else {
            this.setState({
                zoomSliderVisible: true,
                zoomSliderType: this.state.chartTypeOptions.chartType
            });
        }
    };

    public chartTypeOptions: any = {
        Rings: {
            chartType: "Line",
            markerTypes: "Circle",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "red",
            negativeOutlines: "red",
            calloutsVisible: true,
        },
        Points: {
            chartType: "Line",
            markerTypes: "Circle",
            markerBrushes: this.stockColors,
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "red",
            negativeOutlines: "red",
            calloutsVisible: true,
        },
        Columns: {
            chartType: "Column",
            markerTypes: "None",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockFills,
            positiveOutlines: this.stockFills,
            negativeBrushes: "red",
            negativeOutlines: "red",
            calloutsVisible: true,
        },
        Bars: {
            chartType: "Bar",
            markerTypes: "None",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "gray",
            negativeOutlines: "gray",
            calloutsVisible: true,
        },
        Candles: {
            chartType: "Candle",
            markerTypes: "None",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "gray",
            negativeOutlines: "gray",
            calloutsVisible: true,
        },
        Boxes: {
            chartType: "Candle",
            markerTypes: "None",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "gray",
            negativeOutlines: "gray",
            calloutsVisible: false,
        },
        Lines: {
            chartType: "Line",
            markerTypes: "None",
            markerBrushes: "transparent",
            markerOutlines: this.stockColors,
            lineThickness: 1,
            positiveBrushes: this.stockColors,
            positiveOutlines: this.stockColors,
            negativeBrushes: "gray",
            negativeOutlines: "gray",
            calloutsVisible: true,
        },
    };

    public chartTypeModes = [
    // "Area",
    "Bars", "Boxes", "Candles",
    // "Columns",
    "Lines", "Points", "Rings",
        //  ,"Range","Spline","Step","Waterfall"
    ];

    onChartTypesRendering(): JSX.Element[] {
        console.log("onChartTypesRendering...");
        const elements: JSX.Element[] = [];
        for (let i = 0; i < this.chartTypeModes.length; i++) {
            const option = this.chartTypeModes[i];
            // const bg = Win.Colors.Background;
            const bg = this.state.chartTypeMode == option ? Win.Colors.Highlight : Win.Colors.Background;
            const fg = this.state.chartTypeMode == option ? "white" : Win.Colors.Foreground;
            const item = <div key={option} id={option} className="AppToolbarMenuItem"
                        onClick={this.onChartTypeSelected}
                        style={{background: bg, color: fg,}} >
             {option}
            </div>
            elements.push(item);
        }
        return elements;
    }

    onTrendlineModesRendering(): JSX.Element[] {
        console.log("onTrendlineModesRendering...");
        const elements: JSX.Element[] = [];
        for (let i = 0; i < this.TrendlineModes.length; i++) {
            const option = this.TrendlineModes[i];
            const bg = this.state.trendlineMode == option ? Win.Colors.Highlight : Win.Colors.Background;
            const fg = this.state.trendlineMode == option ? "white" : Win.Colors.Foreground;
            const item = <div key={option} id={option} className="AppToolbarMenuItem"
                        onClick={this.onTrendlineSelected}
                        style={{background: bg, color: fg,}} >
             {option}
            </div>
            elements.push(item);
        }
        return elements;
    }

    onTrendlineActive = (event: any) => {
        console.log("onTrendlineActive..." + event);
        this.setState({ trendlineActive: event.currentTarget });
    };
    onTrendlineCancel = (event: any) => {
        console.log("onTrendlineCancel...");
        this.setState({ trendlineActive: null });
    };
    onTrendlineSelected = (event: any) => {
        const id = event.currentTarget.id;
        console.log("onTrendlineSelected..." + id);
        this.setState({
            trendlineActive: null,
            trendlineMode: id,
        }, this.updateChart);
    }

    getEnumKeys(enumName: any): string[] {
        const keys: string[] = [];
        for (const enumMember in enumName) {
            var isValueProperty = parseInt(enumMember, 10) >= 0
            if (!isValueProperty) {
                keys.push(enumMember.toString());
            }
        }
        return keys;
    }

    onIndicatorModesRendering(): JSX.Element[] {
        console.log("onIndicatorModesRendering...");
        const elements: JSX.Element[] = [];
        for (let i = 0; i < this.IndicatorModes.length; i++) {
            const option = this.IndicatorModes[i];
            const bg = this.state.IndicatorModeSelected == option ? Win.Colors.Highlight : Win.Colors.Background;
            const fg = this.state.IndicatorModeSelected == option ? "white" : Win.Colors.Foreground;
            const item = <div key={option} id={option} className="AppToolbarMenuItem"
                        onClick={this.onIndicatorModeSelected}
                        style={{background: bg, color: fg,}} >
             {option}
            </div>
            elements.push(item);
        }
        return elements;
    }

    onIndicatorModePending = (event: any) => {
        console.log("onTrendlineActive..." + event);
        this.setState({ IndicatorModePending: event.currentTarget });
    };
    onIndicatorModeCancel = (event: any) => {
        console.log("onIndicatorModeCancel...");
        this.setState({ IndicatorModePending: null });
    };
    onIndicatorModeSelected = (event: any) => {
        const id = event.currentTarget.id;
        console.log("onIndicatorModeSelected..." + id);

        this.setState({
            IndicatorModePending: null,
            IndicatorModeSelected: id,
            IndicatorTypes: id === "None" ? [] : [id]
        });
    }

    onOverlayModeRendering(): JSX.Element[] {
        console.log("onOverlayModeRendering...");
        const elements: JSX.Element[] = [];
        for (let i = 0; i < this.OverlayModes.length; i++) {
            const option = this.OverlayModes[i];
            const bg = this.state.OverlayModeSelected == option ? Win.Colors.Highlight : Win.Colors.Background;
            const fg = this.state.OverlayModeSelected == option ? "white" : Win.Colors.Foreground;
            const item = <div key={option} id={option} className="AppToolbarMenuItem"
                        onClick={this.onOverlayModeSelected}
                        style={{background: bg, color: fg,}} >
             {option}
            </div>
            elements.push(item);
        }
        return elements;
    }

    onOverlayModePending = (event: any) => {
        console.log("OverlayModes..." + event);
        this.setState({ OverlayModePending: event.currentTarget });
    };
    onOverlayModeCancel = (event: any) => {
        console.log("onOverlayModeCancel...");
        this.setState({ OverlayModePending: null });
    };
    onOverlayModeSelected = (event: any) => {
        const id = event.currentTarget.id;
        console.log("onOverlayModeSelected..." + id);

        this.OverlayAddedCount = 0;
        this.setState({
            OverlayModePending: null,
            OverlayModeSelected: id,
            OverlayTypes: id === "None" ? [] : [id]
        });
    }

    onAxisModesRendering(): JSX.Element[] {
        console.log("onAxisModesRendering...");
        const elements: JSX.Element[] = [];
        for (let i = 0; i < this.AxisModes.length; i++) {
            const option = this.AxisModes[i];
            const bg = this.state.AxisModeSelected == option ? Win.Colors.Highlight : Win.Colors.Background;
            const fg = this.state.AxisModeSelected == option ? "white" : Win.Colors.Foreground;
            const item = <div key={option} id={option} className="AppToolbarMenuItem"
                        onClick={this.onAxisModeSelected}
                        style={{background: bg, color: fg,}} >
             {option}
            </div>
            elements.push(item);
        }
        return elements;
    }

    onAxisModePending = (event: any) => {
        console.log("onAxisModePending..." + event);
        this.setState({ AxisModePending: event.currentTarget });
    };
    onAxisModeCancel = (event: any) => {
        console.log("onAxisModeCancel...");
        this.setState({ AxisModePending: null });
    };
    onAxisModeSelected = (event: any) => {
        const id = event.currentTarget.id;
        console.log("onAxisModeSelected..." + id);
        this.setState({
            AxisModePending: null,
            AxisModeSelected: id,
        });
    }

    onStockSend(e: React.MouseEvent, symbols: string[]) {
        e.stopPropagation();

        if (!window.hasOwnProperty("fin")) {
            return;
        }

        let contextTemplate = {
            object: "fdc3-context",
            definition: "https://fdc3.org/context/1.0.0/",
            version: "1.0.0",
            data: []
        };

        let dataContext: any = JSON.parse(JSON.stringify(contextTemplate));
        for (const symbol of symbols) {
            let dataItem: any = {
                type: "security",
                name: symbol,
                id: {
                  ticker: symbol,
                  default: symbol,
                  ISIN: "US68389X1054",
                  CUSIP: "68389X105",
                  FIGI: "BBG008LS4VN9",
                }
            };
            dataContext.data.push(dataItem);
        }

        let message = { intent: "ViewChart", context: dataContext};
        console.log("FDC3 publishing " + message);

        fin.desktop.InterApplicationBus.publish("FDC3", message,
        () => {
            console.log("FDC3 publishing done " + symbols);
        },
        (reason) => {
            console.log("FDC3 publishing error " + reason);
        })
    }

    public initializeFDC3() {
        // using fin Inter-Application Bus
        if (!window.hasOwnProperty("fin")) {
            console.log("FDC3 disconnected " );
        } else {
            console.log("FDC3 connected" );
            fin.desktop.main(() => {
                console.log("FDC3 subscribing... ViewChart");
                fin.desktop.InterApplicationBus.subscribe("*", "FDC3", (message, uuid, name) => {
                    if (message.intent == "ViewChart") {
                        let tickers: string[] = [];
                        for (const info of message.context.data) {
                            tickers.push(info.id.ticker.toString());
                        }
                        console.log("FDC3 received... ViewChart " + tickers);
                        this.onStockAdded(tickers);
                    }
                });
            });
        }
    }
}

export default withStyles(styles, { withTheme: true })(WinContent);
