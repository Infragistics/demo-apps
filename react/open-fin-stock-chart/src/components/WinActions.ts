
// import React from 'react';
import { WindowBoundsChange } from 'openfin/_v2/api/events/window';

export default class WinActions {

    public static isMatch(windowID: string, win: any): boolean {
        if (win !== undefined &&
            win.identity !== undefined &&
            win.identity.name !== undefined &&
            win.identity.name.indexOf(windowID) > -1) {
                return true;
        }
        return false;
    }
    public static async minimize(windowID: string) {

        this.log(windowID, "minimize...");
        const win = await fin.Window.getCurrent();
        // this.log(windowID, "minimize..." + win.identity);
        if (this.isMatch(windowID, win)) {
            win.minimize();
            this.log(windowID, "minimize... done");
        }
        // this.log(windowID, "minimized...");
        // let win = await fin.Window.getCurrent();
        // if (win === undefined) {
        //     this.log(windowID, "minimize... failed - window is not registered");
        // } else {
        //     win.minimize();
        // }
    }

    public static async maximize(windowID: string) {
        this.log(windowID, "maximized...");
        let win = await fin.Window.getCurrent();
        if (this.isMatch(windowID, win)) {
            win.maximize();
            this.log(windowID, "maximized... done");
        }
    }

    public static async close(windowID: string) {
        // this.log(windowID, "close...");
        let win = await fin.Window.getCurrent();
        if (win !== undefined) {
            win.close();
        }
    }

    public static async undock(windowID: string) {
        this.log(windowID, "undock...");

        if (!window.hasOwnProperty("fin")) {
            return;
        }

        let win = await fin.Window.getCurrent();
        if (win === undefined) {
            this.log(windowID, "undock... failed - cannot find a window");
        } else {
            this.log(windowID, "undock... completed");
            win.leaveGroup();
            if (win.isMainWindow()) {
                win.moveBy(-20, 0);
            } else {
                win.moveBy(20, 0);
            }
        }
    }

    public static async center(windowID: string) {
        let win = await fin.Window.getCurrent();
        if (win === undefined) {
            this.log(windowID, "center... failed - window is not registered");
        } else {
            win.updateOptions(
                {defaultCentered: true}
            );
        }
        // win.moveTo
        // win.resizeTo
    }

    public static async show(windowID: string) {
        this.log(windowID, "show...");
        let win = await fin.Window.getCurrent();
        if (win === undefined) {
            this.log(windowID, "show... failed - window is not registered");
        } else {
            win.show();
        }
    }

    public static log(windowID: string, action: string){
        const winInfo = "WinActions '" + windowID + "'";
        console.log(winInfo + " " + action);
    }

    static windowCounter = 0;
    public static async explode(windowID: string) {
        this.log(windowID, "explode... " + location.href);

        this.windowCounter++;
        if (!window.hasOwnProperty("fin")) {
            this.log(windowID, "explode... failed - OpenFin not found");
        } else {
            var win = new fin.desktop.Window({
                // url: "http://localhost:3400/index.html",
                // name: "IgStockChild|" + stockID,
                url: location.href,
                name: "IgStockCharts|Child" + this.windowCounter,
                defaultWidth: 900,
                defaultHeight: 500,
                defaultCentered: true,
                autoShow: false,
                frame: true, // show/hide OS title bar
                showTaskbarIcon: true,
                resizable: true,
                minimizable: true,
                maximizable: true,
                // hideOnClose: false,
                // saveWindowState: false,
            }, function() {
                var winFrame = win.getNativeWindow();
                console.log(windowID, 'explode show');
                win.show();
            });
        }
    }
}