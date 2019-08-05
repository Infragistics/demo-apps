import * as React from "react";

export default class Detail extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("Detail...");
    }

    public render() {
        console.log("Detail... render");

        return (
            <div>
                Detail
                <p>Info for person ID: {this.props.item}</p>
            </div>
            );
        }
}