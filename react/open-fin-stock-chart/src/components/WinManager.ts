
// import React from 'react';
import { WindowBoundsChange } from 'openfin/_v2/api/events/window';

export default class WinManager {

    private static WinActive = new Map<string, fin.OpenFinWindow>();
    private static WinClosed = new Map<string, fin.OpenFinWindow>();

    public static minimize(windowID: string) {
        this.log(windowID, "minimized...");
        let win = this.WinActive.get(windowID);
        if (win === undefined) {
            this.log(windowID, "minimize... failed - window is not registered");
        } else {
            win.minimize();
        }
    }

    public static maximize(windowID: string) {
        this.log(windowID, "maximized...");
        let win = this.WinActive.get(windowID);
        if (win === undefined) {
            this.log(windowID, "maximize... failed - window is not registered");
        } else {
            win.maximize();
        }
    }

    public static close(windowID: string) {
        // this.log(windowID, "close...");
        let win = this.WinActive.get(windowID);
        if (win !== undefined) {
            win.close();
        }
    }

    public static undock(windowID: string) {
        this.log(windowID, "undock...");
        let win = this.WinActive.get(windowID);
        if (win === undefined) {
            this.log(windowID, "undock... failed - window is not registered");
        } else {
            win.leaveGroup();
        }
    }

    public static center(windowID: string) {
        let win = this.WinActive.get(windowID);
        if (win === undefined) {
            this.log(windowID, "center... failed - window is not registered");
        } else {
            win.updateOptions(
                {defaultCentered: true}, function() {
                    console.log("Window center... " + windowID);
            });
        }
        this.log(windowID, "center... ");
        // win.moveTo
        // win.resizeTo
    }

    public static register(windowID: string, window: fin.OpenFinWindow) {
        this.close(windowID);
        this.log(windowID, "register...");
        this.WinActive.set(windowID, window);
    }

    public static show(windowID: string) {
        this.log(windowID, "show...");
        let win = this.WinActive.get(windowID);
        if (win === undefined) {
            this.log(windowID, "show... failed - window is not registered");
        } else {
            win.show();
        }
    }

    public parentClosing: boolean = false;

    public static onCreated(windowID: string, window: fin.OpenFinWindow, position?: any) {
        console.log("Window onCreated... " + windowID);
        if (position) {
            // window.setBounds(position[0], position[1]);
            // win.moveTo
            // win.resizeTo
        }

        const focused = () => {
            this.log(windowID, "focus... completed");
            // this.onWindowModified(identity, true);
        };
        const shown = () => {
            this.log(windowID, "shown... completed");
        };
        const minimized = () => {
            this.log(windowID, "minimized... completed");
        };
        const maximized = () => {
            this.log(windowID, "maximized... completed");
        };
        const restored = () => {
            this.log(windowID, "restored... completed");
        };
        const boundsChanged = () => {
            this.log(windowID, "bounds-changed completed");
            // this.onWindowModified(identity, undefined, this.sanitizeBounds(evt));
        };

        const onCloseRequested = () => {
            this.log(windowID, "onCloseRequested... completed");
        };
        const onClose = () => {
            window.removeEventListener('shown', shown);
            window.removeEventListener('focused', focused);
            window.removeEventListener('restored', restored);
            window.removeEventListener('minimized', minimized);
            window.removeEventListener('maximized', maximized);
            window.removeEventListener('bounds-changed', boundsChanged);
            window.removeEventListener('closed', onClose);
            window.removeEventListener('close-requested', onCloseRequested);
            this.log(windowID, "close... completed");
        };

        window.addEventListener('focused', focused);
        window.addEventListener('shown', shown);
        window.addEventListener('minimized', minimized);
        window.addEventListener('maximized', maximized);
        window.addEventListener('bounds-changed', boundsChanged);

        this.register(windowID, window);
        this.show(windowID);
        // window.show();
    }

    public static onClosed(windowID: any) {
        console.log("Window onClosed... " + windowID);
        // public static onClosed({windowID: any}) {
        // if (this.parentClosing) {
        //     return;
        // }
        // if (this.childWindows[name]) {
        //     this.childWindows[name].removeEventListener('closed', this.onChildClosed, () => (
        //         delete this.childWindows[name]
        //     ));
        // }

        // const isFinalChildWindowClosing = this.getChildWindowCount() === 0 ||
        //     (this.getChildWindowCount() === 1 && this.store.getState().childWindows[name]);

        // if (isFinalChildWindowClosing && this.getWindowDragOutCount() === 0) {
        //     fin.desktop.Window.getCurrent().close();
        // } else {
        //     this.store.dispatch(close(name, Date.now()));
        // }
    }

    public static log(windowID: string, action: string){
        const winInfo = "Window '" + windowID + "'";
        console.log(winInfo + " " + action);
    }

}