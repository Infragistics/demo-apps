import * as React from "react";

import WinActions from './WinActions';
import WinTooltip from './WinTooltip';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import * as IconUndock from '@material-ui/icons/VerticalSplit';
import * as IconMin from '@material-ui/icons/Minimize';
import * as IconMax from '@material-ui/icons/CropSquare';
import * as IconClose from '@material-ui/icons/Close';

const iconSize = 20;
const styles = {
    toolbar: {
        // backgroundColor: "red",
        // height: "100%",
        // width: 256
        // backgroundColor: "gray",
        // color: "white",
        // fontWeight: "bold",
        // padding: "10px",
        // width: "100%",
        // WebkitAppRegion: "drag"
        // marginTop: 6,
    },
    button: { padding: 0, margin: 4, marginRight: 6, width: iconSize+5, height: iconSize+5, minHeight: 0},
    Icon: { padding: 0, margin: 0, width: iconSize, height: iconSize},
    IconMin: { padding: 0, marginTop: -12, width: iconSize + 10, height: iconSize + 10},
    IconUndock: { padding: 0, marginTop: 0, width: iconSize+2, height: iconSize+2},
    IconClose: { padding: 0, margin: 0, width: iconSize+2, height: iconSize+2},
}
const tips = {
    IconUndock: "Undock this window from other docked windows",
    IconClose: "Closes this window and returns current stock to main chart",
}

export default class WinToolbar extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("WinToolbar()");
    }

    public render() {
        const style = this.props.style
        ? { ...styles.toolbar, ...this.props.style }
        : styles.toolbar;
        const change = (Math.random() * 10).toFixed(1);
        return (
            <div className="WinToolbar" style={styles.toolbar}>

                    {/* <div className="WinToolbarTitle">{this.props.symbol} +/- 20.5%</div> */}
                    <div className="WinToolbarTitle">React Stock Charts</div>
                    {/* <div className="WinToolbarTitle"> {this.props.symbol} +{change}%</div> */}

                    {/* <WinTooltip message={tips.IconMin} position={'bottom'}>
                    <div className="WinToolbarActions">{this.props.symbol} +/- 20.5%</div>
                    </WinTooltip> */}

                    <div className="WinToolbarActions">
                        {/* <WinButton
                        tipMessage={tips.IconMin}
                        style={styles.button}
                        onClick={() => WinActions.minimize(this.props.symbol)}>
                                <IconMin.default style={styles.IconMin}/>
                        </WinButton> */}

                        {/* <IconButton className="WinToolbarButton" style={styles.button} onClick={() => WinActions.undock(this.props.symbol)}><IconUndock.default style={styles.IconUndock}/></IconButton> */}

                        <IconButton className="WinToolbarButton"
                            style={styles.button}
                            onClick={() => WinActions.undock(this.props.symbol)}>
                            <WinTooltip message={tips.IconUndock} position={'topLeft'}>
                                <IconUndock.default style={styles.IconUndock}/>
                            </WinTooltip>
                        </IconButton>
                        <IconButton className="WinToolbarButton" style={styles.button} onClick={() => WinActions.minimize(this.props.symbol)}><IconMin.default style={styles.IconMin}/></IconButton>
                        <IconButton className="WinToolbarButton" style={styles.button} onClick={() => WinActions.maximize(this.props.symbol)}><IconMax.default style={styles.Icon}/></IconButton>
                        {/* <IconButton className="WinToolbarButton" style={styles.button} onClick={() => WinActions.close(this.props.symbol)}><IconClose.default style={styles.IconClose}/></IconButton> */}
                        <IconButton className="WinToolbarButton"
                            style={styles.button}
                            onClick={() => WinActions.close(this.props.symbol)}>
                            {/* <WinTooltip message={tips.IconClose} position={'topLeft'}> */}
                                <IconClose.default style={styles.IconClose}/>
                            {/* </WinTooltip> */}
                        </IconButton>
                    </div>
                    {/* <Fab color="primary" aria-label="Add"><AddIcon /></Fab>
                    <IconButton color="primary" aria-label="Add"><AddIcon /></IconButton> */}

                {/* </div> */}
            </div>
        );
    }
}