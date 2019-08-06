export default class Win {

    public static IconSize: number = 20;
    public static FontSize: number = 12;

    public static ToolbarSize: number = Win.IconSize + 6;

    public static Colors: any = {
        Positive: "#2dfa3e",
        Negative: "#fc0303",

        Fill: "#555555",
        StockNormal: "#5a5a5a",
        StockSelected: "#747373",
        Background: "#353434",
        Foreground: "#c9c9c9",
        // Highlight: "#308df7",
        HoverBackground: "#555555",
        Highlight: "#308df7",
        ToolbarBackground: "#1E1E1E",
    }

    public static Styles: any = {

        Button: { padding: 0, margin: 4, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0},
        ButtonMenu: { padding: 0, margin: 4, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0, marginLeft: 8, marginRight: 6, },
        ButtonSend: { padding: 0, margin: 4, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0 },
        ButtonSettings: { padding: 0, margin: 4, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0, justifySelf: "end"},
        ButtonDelete: { padding: 0, margin: 0, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0, justifySelf: "center"},
        ButtonExplode: { padding: 0, margin: 4, width: Win.IconSize+5, height: Win.IconSize+5, minHeight: 0, justifySelf: "end"},
        Icon: { padding: 0, margin: 0, width: Win.IconSize, height: Win.IconSize},
        IconBadge: { margin: 0, width: Win.IconSize+5, height: Win.IconSize+5},
        IconSend:  { margin: 0, width: Win.IconSize, height: Win.IconSize+5, padding: 0, },
        IconMin: { padding: 0, marginTop: -12, width: Win.IconSize + 10, height: Win.IconSize + 10},
        IconUndock: { padding: 0, marginTop: 0, width: Win.IconSize+2, height: Win.IconSize+2},
        IconClose: { padding: 0, margin: 0, width: Win.IconSize+2, height: Win.IconSize+2},
        IconMenu: { padding: 0, margin: 2, width: Win.IconSize-2, height: Win.IconSize-2},
        IconSettings: { padding: 0, margin: 0, width: Win.IconSize+2, height: Win.IconSize+2},
        IconSearch: { padding: 0, margin: 0, width: Win.IconSize+2, height: Win.IconSize+2},
        IconDelete: { padding: 0, margin: 0, width: Win.IconSize+2, height: Win.IconSize+2},
        // IconSearch: {verticalAlign: 'center', padding: 0, margin: 0, width: Win.IconSize-5, height: Win.IconSize-5},
    };


}