import * as React from "react";
import App from './AppRouter'
import '../views/MasterView.css'

export default class MasterView extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("MasterView...");
    }

    public handleClick(event: React.MouseEvent) {
        event.preventDefault();
        console.log("handleClick " + event.currentTarget.id);
    }

    // public renderItem(person: any, index: number): JSX.Element {
    //     const imageSize = 50;
    //     const borderSize = imageSize / 2.0;
    //     const avatarStyle = {
    //         backgroundImage: "url(" + person.Avatar + ")",
    //         width: imageSize.toString() + "px",
    //         height: imageSize.toString() + "px",
    //         borderRadius: borderSize.toString() + "px",
    //     } as React.CSSProperties;

    //     let div =
    //     // <a href={`/person/${person.ID}`} key={'item' + person.ID}>
    //         <button className="masterListButton" onClick={this.handleClick} id={person.ID} key={'item' + index} >
    //             <div className="masterListItem" >
    //                 <div className="masterListAvatar" style={avatarStyle}/>
    //                 <div className="masterListInfo"  >
    //                     {/* <a href={`/person/${person.ID}`} key={'item' + person.ID}>Name {person.Name}</a> */}
    //                     <span className="masterListInfoName">{person.Name}</span>
    //                     <span>
    //                         <img src={this.getLocationIcon()}/>
    //                         <label>{person.City + ", " + person.CountryName}</label>
    //                     </span>
    //                 </div>
    //             </div>
    //         </button>
    //     // </a>
    //     return div;
    // }
    public render() {
        console.log("MasterView... render");

        let links: JSX.Element[] = [];

        if (this.props.dataSource !== undefined) {
            for (let i = 0; i < this.props.dataSource.length; i++) {
                const person =  this.props.dataSource[i];
                links.push(this.renderMasterItem(person, i));
            }
        }

        return (
            <div className="masterView">
                <div className="masterHeader">
                    <img src={this.getHeaderIcon()}/>
                    <label>World Sales Team</label>
                </div>
                <div className="masterList">
                    <div >{links}</div>
                </div>
            </div>
            );
    }

    public renderMasterItem(person: any, index: number): JSX.Element {
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
                            <img src={this.getLocationIcon()}/>
                            <label>{person.City + ", " + person.CountryName}</label>
                        </span>
                    </div>
                </div>
            </button>
        // </a>
        return div;
    }

    public onMasterItemClick(event: React.MouseEvent) {
        event.preventDefault();
        console.log("onMasterItemClick " + event.currentTarget.id);
        const newId = event.currentTarget.id;
        const newData = App.salesPeople[newId].Sales;

        // this.setState({salesData: newData});

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

    public getHeaderIcon(): string {
        return require('../assets/ig.png');
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