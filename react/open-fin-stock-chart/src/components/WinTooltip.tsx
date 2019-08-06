import * as React from "react";

// https://codepen.io/andrewerrico/pen/OjbvvW
export default class WinTooltip extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        // console.log("Tooltip()");

        this.state = {
            displayTooltip: false
        }
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
    }

    public hide() {
        // console.log("Tooltip hide");
        this.setState({displayTooltip: false})
    }

    public show() {
        // console.log("Tooltip show");
        this.setState({displayTooltip: true})
    }

    public render() {const iconSize = 40;
        const styles = {
            button: { padding: 0, margin: 4, width: iconSize+5, height: iconSize+5, minHeight: 0},
            icon: { padding: 0, margin: 0, width: iconSize, height: iconSize},
        };

        const message = this.props.message
        const position = this.props.position
        return (
          <span className='WinTooltip'
                onMouseLeave={this.hide}>
            {this.state.displayTooltip &&
            <div className={`WinTooltip-bubble WinTooltip-${position}`}>
                {/* <IconButton color="secondary" style={styles.button}><Info style={styles.icon}/></IconButton> */}
                <div className='WinTooltip-message'>{message}</div>
            </div>}
            <span className='WinTooltip-trigger'
                  onMouseOver={this.show}>
              {this.props.children}
            </span>
          </span>
        )
    }

}