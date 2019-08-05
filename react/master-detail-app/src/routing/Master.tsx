import * as React from "react";

export default class Master extends React.Component {

    constructor(props: any) {
        super(props);
        console.log("Master...");
    }

    public render() {
        console.log("Master... render");

        let links = [1, 2, 3, 4, 5].map((item) =>
            <li key={'item' + item} >
            <a href={`/person/${item}`} >Item {item}</a>
            </li>
        );
        return (
            <div>
                Master
                <ul>{links}</ul>
            </div>
            );
    }
}