// import { StocksLookup } from "./StocksLookup";

export class StocksUtility {

    public static Settings = {
        PriceValue: 200,
        PriceRange: 10,
        VolumeRange: 1000,
        VolumeStart: 20000,
        IntervalDays: 1,
        IntervalHours: 0,
        IntervalMinutes: 0,
    }

    // public static defaultStartDays: number = 200;
    public static defaultStartDays: number = 500;
    public static defaultEndDate: Date = new Date(2020, 1, 1);

    public static stockList: any[] = []
    public static stocksLookup: Map<string, any> = new Map<string, any>();

    public static GetStockInfo(symbol: string): any {
        const lookup = this.GetStockLookup();
        if (lookup.has(symbol)) {
            return lookup.get(symbol);
        } else {
            const stock: any = { symbol: symbol, name: "", price: this.Settings.PriceValue };
            stock.label = stock.symbol;
            stock.selected = false;
            if (!this.stocksLookup.has(stock.symbol)) {
                // let item = Object.assign({label: stock.symbol + stock.symbol}, stock );
                this.stocksLookup.set(stock.symbol, stock);
            }
            return stock;
        }
        // return stock;
    }

    public static GetStockLookup(): Map<string, any> {
        if (this.stocksLookup.size > 0) {
            return this.stocksLookup;
        }

        for (let stock of this.GetStockList()) {
            stock.label = stock.symbol + " - " +  stock.name
            stock.selected = false;
            if (!this.stocksLookup.has(stock.symbol)) {
                // let item = Object.assign({label: stock.symbol + stock.symbol}, stock );
                this.stocksLookup.set(stock.symbol, stock);
            }
        }
        console.log("GetStockLookup " + this.stocksLookup.size);
        return this.stocksLookup;
    }
    public static GetStockList(): any[] {

        if (this.stockList.length > 0) {
            return this.stockList;
        }

        // httpsymbol://www.thestreet.com/stock-market-news/10579592/top-rated-stocks/top-rated-stocks.html

        this.stockList = [
            { symbol: "BABA", name: "Alibaba Group Holding Ltd.", price: 178 },
            { symbol: "AMZN", name: "Amazon.com Inc.", price: 1889.98 },
            { symbol: "GOOG", name: "Alphabet Inc.", price: 1164.27 },
            { symbol: "WMT", name: "Walmart Inc.", price: 101.91 },
            { symbol: "AAPL", name: "Apple Inc.", price: 197.18 },
            // Auto
            { symbol: "TSLA", name: "Tesla Inc. ", price: 239.52 },
            { symbol: "F", name: "Ford Motor Co.", price: 10.38 },
            { symbol: "GM", name: "General Motors Co.", price: 37.89 },
            { symbol: "TM", name: "Toyota Motor Corp Ltd", price: 119.27 },
            { symbol: "FCAU", name: "Fiat Chrysler Automobiles N.V.", price: 14.72 },
            { symbol: "HMC", name: "Honda Motor Co. Ltd.", price: 26.09 },
            { symbol: "SOLO", name: "ElectrAmeccanica Vehicles Corp. Ltd.", price: 3.05 },
            { symbol: "RACE", name: "Ferrari N.V.", price: 141.33 },
            // Computer
            { symbol: "HPE", name: "Hewlett Packard Enterprise Co.", price: 14.79 },
            { symbol: "XRX", name: "Xerox Corp.", price: 32.23 },
            { symbol: "LOGI", name: "Logitech Int. S.A.", price: 38.86 },
            { symbol: "STX", name: "Seagate Technology PLC", price: 47.4 },
            { symbol: "CAJ", name: "Canon Inc.", price: 27.71 },
            { symbol: "INTC", name: "Intel Corp.", price: 46.2 },
            { symbol: "CSCO", name: "Cisco Systems Inc.", price: 53.36 },
            { symbol: "TESS", name: "Tessco Technologies Inc.", price: 18.03 },
            { symbol: "NVDA", name: "Nvidia Corp.", price: 168.82 },
            { symbol: "GE", name: "General Electric Co.", price: 10.13 },
            { symbol: "QCOM", name: "Qualcomm Inc.", price: 85.84 },
            { symbol: "IBM", name: "Int. Business Machines", price: 135.32 },
            // BANKS
            { symbol: "BAC", name: "Bank of America Corp.", price: 29.58 },
            { symbol: "FRC", name: "First Republic Bank", price: 103.31 },
            { symbol: "CHCO", name: "City Holding Co.", price: 79.13 },
            { symbol: "FCAP", name: "First Capital Inc.", price: 50.68 },
            { symbol: "BLW", name: "Citigroup Inc.", price: 14.81 },
            { symbol: "MA", name: "Mastercard Inc.", price: 247.43 },
            { symbol: "V", name: "Visa Inc.", price: 160.71 },
            // Software
            { symbol: "FB", name: "Facebook Inc.", price: 188.34 },
            { symbol: "TWTR", name: "Twitter Inc.", price: 38.45 },
            { symbol: "MSFT", name: "Microsoft Corp.", price: 127.13 },
            { symbol: "ORCL", name: "Oracle Corp.", price: 54.65 },
            { symbol: "RHT", name: "Red Hat Inc.", price: 184.78 },
            { symbol: "FNJN", name: "Finjan Holdings Inc.", price: 3.13 },
            { symbol: "ATVI", name: "Activision Blizzard Inc.", price: 46.02 },
            { symbol: "ADBE", name: "Adobe Inc.", price: 278.48 },
            // Telecom
            { symbol: "CHKP", name: "Check Point Software Technologies Ltd.", price: 118.63 },
            { symbol: "VZ", name: "Verizon Communications Inc.", price: 56.91 },
            { symbol: "T", name: "AT&T Inc.", price: 30.62 },
            { symbol: "TMUS", name: "T-Mobile US Inc.", price: 75.23 },
            { symbol: "S", name: "Sprint Corp.", price: 6.19 },
            { symbol: "BA", name: "Boeing Co.", price: 354.67 },
            // IT
            { symbol: "INFY", name: "Infosys Ltd.", price: 10.26 },
            { symbol: "GIB", name: "CGI Inc.", price: 71.82 },
            { symbol: "ACN", name: "Accenture PLC", price: 174.3 },
            { symbol: "UBER", name: "Uber Technologies Inc.", price: 41.57 },
            { symbol: "LYFT", name: "Lyft Inc.", price: 51.09 },
            { symbol: "CVS", name: "CVS Health Corp.", price: 55.16 },
            // Beverage
            { symbol: "KO", name: "Coca-Cola Co.", price: 48.19 },
            { symbol: "PEP", name: "Pepsico Inc.", price: 128.01 },
            { symbol: "MNST", name: "Monster Beverage Corp.", price: 63 },
            // Airlines
            { symbol: "SKYW", name: "SkyWest Inc.", price: 60.67 },
            { symbol: "LUV", name: "Southwest Airlines Co.", price: 52.74 },
            { symbol: "DAL", name: "Delta Air Lines Inc.", price: 56.62 },
            { symbol: "UAL", name: "United Continental Holdings Inc.", price: 84.79 },
            { symbol: "AAL", name: "American Airlines Group Inc.", price: 33.99 },
            { symbol: "ALK", name: "Alaska Air Group Inc.", price: 61.27 },
            { symbol: "HA", name: "Hawaiian Holdings Inc.", price: 26.72 },
            { symbol: "GD", name: "General Dynamics Corp.", price: 173.08 },
        ];


        this.stockList = this.stockList.sort(this.sortByName);
        // console.log("StocksUtility GetStockList " + this.stockList.length);

        return this.stockList;
    }


    public static GetStock(symbol: string, dateEnd?: Date, days?: number): any {

        const stock = StocksUtility.GetStockInfo(symbol);
        if (stock === null) {
            return null;
        }

        if (days === undefined) {
            days = this.defaultStartDays;
        }

        if (dateEnd === undefined) {
            const now = new Date();
            dateEnd = new Date(now.getFullYear(), now.getMonth(), now.getDay(), 17, 30, 0);
            // dateEnd = this.defaultEndDate;
        }

        // console.log("price " + stock.price)
        const data = this.GetStocksHistory(dateEnd, days, symbol, stock.price);
        this.Annotate(data, symbol);
        const dataLast = data[data.length - 1];
        stock.data = data;
        stock.date = dataLast.Date;
        stock.price = dataLast.Close;
        stock.priceChange = this.GetStockPriceChange(stock);
        stock.pricePercentage = this.GetStockPricePercentage(stock);
        // stock.priceChange = Math.round((Math.random() * 20 - 10) * 10) / 10;
        // stock.pricePercentage = Math.round(stock.priceChange / stock.price * 1000) / 10;
        return stock;
    }

    public static GetStockPriceChange(stock: any): number {
        const range = Math.max(stock.price * 0.05, this.Settings.PriceRange);
        const change = (Math.random() * range) - (range / 2)
        return Math.round(change * 10) / 10;
    }

    public static GetStockPricePercentage(stock: any): number {
        const change = stock.priceChange / stock.price * 100
        return Math.round(change * 10) / 10;
    }

    public static GetStocksData(symbols: string[], dateEnd?: Date, days?: number): any[] {
        const stocks: any[] = [];
        let id = 0;
        for (const symbol of symbols) {
            const stock: any = this.GetStock(symbol, dateEnd, days);
            if (stock !== null) {
                stock.ID = id++;
                stocks.push(stock);
            }
        }
        return stocks;
    }

    public static GetStocksHistory(dateEnd: Date, days: number, symbol?: string, priceEnd?: number): any[] {
        const dateStart = this.AddDays(dateEnd, -days);
        return this.GetStocksBetween(dateStart, dateEnd, symbol, priceEnd);
    }


    public static GetStocksBetween(dateStart: Date, dateEnd: Date, symbol?: string, priceEnd?: number): any[] {

        if (symbol === undefined) {
            symbol = "STOCK";
        }
        if (priceEnd === undefined) {
            priceEnd = this.Settings.PriceValue;
        }

        let interval = this.Settings.IntervalDays * 24 * 60;
        interval += this.Settings.IntervalHours * 60;
        interval += this.Settings.IntervalMinutes;

        let dt = this.AddDays(dateEnd, 0);
        let v = this.Settings.VolumeStart;
        let o = priceEnd;
        let h = o + (Math.random() * this.Settings.PriceRange);
        let l = o - (Math.random() * this.Settings.PriceRange);
        let c = l + (Math.random() * (h - l));

        let stockData = [];
        while (dt.getTime() > dateStart.getTime()) {
            // console.log("open " + o)
            stockData.push({ Date: dt,
                Open: o,
                Close: c,
                High: h,
                Low: l,
                Volume: v,
            });

            o = c + ((Math.random() - 0.5) * this.Settings.PriceRange);
            if (o < 0) {
                o = Math.abs(o) + 2;
            }
            h = o + (Math.random() * this.Settings.PriceRange);
            l = o - (Math.random() * this.Settings.PriceRange);
            c = l + (Math.random() * (h - l));
            v = v + ((Math.random() - 0.5) * this.Settings.VolumeRange);
            if (v < 0) {
                v = Math.abs(v) + 10000;
            }
            if (h < 0) {
                h = Math.abs(h) + 2;
            }
            if (c < 0) {
                c = Math.abs(c) + 2;
            }
            if (l < 0) {
                l = Math.abs(l) + 2;
            }

            o = Math.round(o * 100) / 100;
            h = Math.round(h * 100) / 100;
            l = Math.round(l * 100) / 100;
            c = Math.round(c * 100) / 100;
            v = Math.round(v * 100) / 100;
            dt = this.AddMinutes(dt, -interval);
        }

        stockData = stockData.sort(this.sortByDate);

        // setting data intent for Series Title
        (stockData as any).__dataIntents = {
            // close: ["SeriesTitle/Stock Prices"]
            Close: ["SeriesTitle/" + symbol]
        };
        // console.log("StocksUtility " + stockData.length + " " + symbol);
        return stockData;
    }

    public static sortByDate(a: any, b: any) {
        const aDate = a.Date.getTime();
        const bDate = b.Date.getTime();
        if (aDate > bDate) { return 1; }
        if (aDate < bDate) { return -1; }
        return 0;
    }

    public static sortByName(a: any, b: any) {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
    }

    public static sortBySymbol(a: any, b: any) {
        if (a.symbol > b.symbol) { return 1; }
        if (a.symbol < b.symbol) { return -1; }
        return 0;
    }

    public static Annotate(data: any[], symbol: string) {

        let minValue: number = Number.MAX_VALUE;
        let maxValue: number = Number.MIN_VALUE;
        let minIndex: number = 0;
        let maxIndex: number = 0;

        let splitInterval = 500 + Math.round(Math.random() * 100);
        let dividInterval = 300 + Math.round(Math.random() * 100);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            if (minValue > item.Close) {
                minValue = item.Close;
                minIndex = i;
            }
            if (maxValue < item.Close) {
                maxValue = item.Close;
                maxIndex = i;
            }

            if (StocksUtility.IsQuarterStart(item.Date)) {
                // data[i].Info = "Q" + StocksUtility.GetQuarter(item.Date);
                // data[i].Symbol = symbol;
                // data[i].Value = item.Close;
                // data[i].Index = i;
            }
            else if ((i + 5) % splitInterval == 0) {
                data[i].Info = "SLT";
                data[i].Symbol = symbol;
                data[i].Value = item.Close;
                data[i].Index = i;
            }
            else if ((i + 5) % dividInterval == 0) {
                data[i].Info = "DIV";
                data[i].Symbol = symbol;
                data[i].Value = item.Close;
                data[i].Index = i;
            }
        }

        data[minIndex].Info = "MIN";
        data[minIndex].Symbol = symbol;
        data[minIndex].Value = minValue;
        data[minIndex].Index = minIndex;

        data[maxIndex].Info = "MAX";
        data[maxIndex].Symbol = symbol;
        data[maxIndex].Value = maxValue;
        data[maxIndex].Index = maxIndex;
    }

    public static GetYear(date: Date): number {
        return date.getFullYear();
    }

    public static GetQuarter(date: Date): number {
        const month = date.getMonth();
        return Math.round((month + 2) / 3);
    }

    public static IsQuarterStart(date: Date): boolean {
        const month = date.getMonth();
        const day = date.getDate();
        return (month % 3 == 0) && day == 1;
    }

    public static AddMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }

    public static AddHours(date: Date, hours: number): Date {
        return new Date(date.getTime() + hours * 60 * 60 * 1000);
    }

    public static AddDays(date: Date, days: number): Date {
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    public static AddYears(date: Date, years: number): Date {
        return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
    }
    public static toStringTruncate(str: string, chars?: number): string {
        if (chars === undefined) {
            chars = 10;
        }
        const length = Math.min(chars, str.length);
        return str.substring(0, length);
    }

    public static toStringChange(price: number): string {
         if (price < 0) {
             return " " + price.toFixed(1);
         } else {

            return " +" + price.toFixed(1);
         }
    }

    public static toStringShort(largeValue: number): string {
        let roundValue: number;

        if (largeValue >= 1000000) {
            roundValue = Math.round(largeValue / 100000) / 10;
            return roundValue + "M";
        }
        if (largeValue >= 1000) {
            roundValue = Math.round(largeValue / 100) / 10;
            return roundValue + "K";
        }

        roundValue = Math.round(largeValue);
        return roundValue + "";
    }

    private static getRandomNumber(min: number, max: number): number {
        return Math.round(min + Math.random() * (max - min));
    }

    private static getRandomItem(array: any[]): any {
        const index = Math.round(this.getRandomNumber(0, array.length - 1));
        return array[index];
    }
}