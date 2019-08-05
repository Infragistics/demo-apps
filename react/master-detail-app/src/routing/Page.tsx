import * as React from "react";

import Master from "./Master";
import Detail from "./Detail";

export default class Page extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("Page...");
    }

    public render() {
        let ID = this.props.match.params.ID;
        console.log("Page... render ID=" + ID);

        return (
            <div>
                Page
                <Master />
                {ID && <Detail item={ID} />}
            </div>
            );
        }
}