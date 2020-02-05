import { find } from 'rxjs/operators';
import { addEventListener, create } from 'openfin-notifications';

declare var fin: any; // openfin

export class OpenfinUtils {

    static windowCounter = 0;
    static windowBaseName = "/angular-sample-apps/stocks-dashboard";

    public static isRunning(): boolean {
        return window.hasOwnProperty("fin");
    }

     public static isWindow(window: any, name: string): boolean {
        if (window !== undefined &&
            window.identity !== undefined &&
            window.identity.name !== undefined &&
            window.identity.name.indexOf(name) > -1) {
                return true;
        }
        return false;
    }

    public static async open(path: string,
        width?: number, height?: number,
        left?: number, top?: number, options?: any) {

        let windowOrigin = location.origin;
        if (!windowOrigin.endsWith(this.windowBaseName)) {
            windowOrigin += this.windowBaseName;
        }
        let windowUrl = windowOrigin + path;
        // console.log(path, "location.hostname: \n" + location.hostname);
        // console.log(path, "location.origin: \n" + location.origin);
        // console.log(path, "location.host: \n" + location.host);
        // console.log(path, "location.href: \n" + location.href);
        console.log(path, "windowUrl: \n" + windowUrl);

        if (!this.isRunning()) {
            this.log(path, "openfin is undefined, opening: \n" + windowUrl);

            window.open(windowUrl, "_self");
            //   window.open(windowUrl, "_blank");
            return;
        }

        console.log("openfin window: \n" + windowUrl);

        options = this.CheckOptions(width, height, left, top, options);

        const app = await fin.Application.getCurrent();
        // const windowGroup = app.identity.uuid + "|" + windowID + " " + this.windowCounter;
        const windowGroup = app.identity.uuid + "|" + path + "test";
        const win = new fin.desktop.Window({
            // icon: location.href + "assets/images/icon.png"
            url: windowUrl,
            // customData: windowID,
            name: windowGroup,
            taskbarIconGroup: windowGroup,
            saveWindowState: false, // allow default options when false
            defaultWidth: options.width,
            defaultHeight: options.height,
            defaultTop: options.top,
            defaultLeft: options.left,
            defaultCentered: options.centered,
            autoShow: options.autoShow,
            frame: options.showTitle, // show/hide OS title bar
            showTaskbarIcon: options.showTaskbarIcon,
            resizable: options.resizable,
            minimizable: options.minimizable,
            maximizable: options.maximizable,
            // hideOnClose: false,
            // backgroundColor: "#FFF"
        }, function() { // on window created
            // const winFrame = win.getNativeWindow();
            console.log(path, " create complete");
            win.show();
        });

    }

    public static async create(windowID: string,
        width?: number, height?: number,
        left?: number, top?: number, options?: any) {

        if (!this.isRunning()) {
            this.log(windowID, "create... failed - OpenFin not found");
            return;
        }

        this.log(windowID, "create... " + location.href);

        options = this.CheckOptions(width, height, left, top, options);

        this.windowCounter++;
        const app = await fin.Application.getCurrent();
        // const windowGroup = app.identity.uuid + "|" + windowID + " " + this.windowCounter;
        const windowGroup = app.identity.uuid + "|" + windowID + "test";
        const win = new fin.desktop.Window({
            // icon: location.href + "assets/images/icon.png"
            url: location.href,
            customData: windowID,
            name: windowGroup,
            taskbarIconGroup: windowGroup,
            saveWindowState: false, // allow default options when false
            defaultWidth: options.width,
            defaultHeight: options.height,
            defaultTop: options.top,
            defaultLeft: options.left,
            defaultCentered: options.centered,
            autoShow: options.autoShow,
            frame: options.showTitle, // show/hide OS title bar
            showTaskbarIcon: options.showTaskbarIcon,
            resizable: options.resizable,
            minimizable: options.minimizable,
            maximizable: options.maximizable,
            // hideOnClose: false,
            // backgroundColor: "#FFF"
        }, function() { // on window created
            // const winFrame = win.getNativeWindow();
            console.log(windowID, " create complete");
            win.show();
        });

        // app.once("run-requested", async () => {
            // await fin.Window.create({
            //     name: app.identity.uuid + "|explorer",
            //     url: location.href,
            //     autoShow: true
            // });
        // });
    }

    public static CheckOptions(
        width?: number, height?: number,
        left?: number, top?: number, options?: any): any {

        if (options === undefined) { options = {}; }
        if (options.centered === undefined) { options.centered = false; }
        if (options.autoShow === undefined) { options.autoShow = false; }
        if (options.showTitle === undefined) { options.showTitle = true; }
        if (options.showTaskbarIcon === undefined) { options.showTaskbarIcon = true; }
        if (options.minimizable === undefined) { options.minimizable = true; }
        if (options.maximizable === undefined) { options.maximizable = true; }
        if (options.resizable === undefined) { options.resizable = true; }

        if (width === undefined) { options.width = 700; } else { options.width = width; }
        if (height === undefined) { options.height = 600; } else { options.height = height; }
        if (left === undefined) { options.left = 20; } else { options.left = left; }
        if (top === undefined) { options.top = 20; } else { options.top = top; }

        console.log("options " + options.width + "x" + options.height);
        return options;
    }

    public static log(windowID: string, action: string) {
        // const winInfo = """ + windowID + """;
        const winInfo = "openfin " + windowID + " ";
        console.log(winInfo + " " + action);
    }

    public static async logInfo() {
        if (!this.isRunning()) { return; }

        console.log("openfin running");
        // get a reference to the current Application.
        const app = await fin.Application.getCurrent();
        const win = await fin.Window.getCurrent();
        const ver = await fin.System.getVersion();

        console.log("openfin app uuid: " + app.identity.uuid);
        console.log("openfin win name: " + win.identity.name);
    }


    public static async notify(title: string, body: string, category: string) {

        if (!window.hasOwnProperty("fin")) {
            return;
        }

        let windowOrigin = location.origin;
        if (!windowOrigin.endsWith(this.windowBaseName)) {
             windowOrigin += this.windowBaseName;
        }

        const iconDismiss = windowOrigin + "/assets/images/notification/dismiss.png";
        const iconAngular = windowOrigin + "/assets/images/notification/angular.png";

        // creating Openfin notification
        create({
            title: title, // 'Reminder',
            body: body, // 'Event "Weekly Meeting" is starting soon...',
            category: category, // 'Upcoming Events',
            icon: iconAngular,
            buttons: [
                // A button that closes the notification and doesn't prompt the user about this event again. Since the
                // application doesn't need to do anything when the user clicks this button, we leave 'onClick' undefined
                // rather than specifying a NotificationActionResult. This means that no action will be raised when the
                // button is clicked, and hence no "notification-action" event will be fired
                {
                    title: 'Dismiss',
                    // iconUrl: iconDismiss
                    // iconUrl: 'https://www.example.com/cancel.png'
                }
            ]
        });
    }
}
