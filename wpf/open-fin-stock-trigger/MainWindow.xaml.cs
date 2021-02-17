using Newtonsoft.Json.Linq;
using System;
using System.Windows; 
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace OpenFinStockChartTrigger
{
    public partial class MainWindow : Window
    {
        private Openfin.Desktop.ApplicationOptions _appOptions;
        private Openfin.Desktop.Runtime _runtime;
        private string AppName = "Stock Chart Trigger";

        private string[] _symbols = new string[]
        {
            "FB",
            "GE",
            "GM",
            "AAPL",
            "ADBE",
            "AMZN",
            "GOOG",
            "LYFT",
            "INTC",
            "MSFT",
            "QCOM",
            "NVDA",
            "UBER",
            "TSLA",
            "WMT",
        };

        public MainWindow()
        {
            InitializeComponent();

            this.Title = AppName + " - OpenFin...";

            DataContext = _symbols;

            var runtimeOptions = new Openfin.Desktop.RuntimeOptions
            {
                Version = "beta"
            };

            _runtime = Openfin.Desktop.Runtime.GetRuntimeInstance(runtimeOptions);
            _runtime.Error += (sender, e) =>
            {
                Console.Write(e);
                var time = DateTime.Now.ToString("hh:mm:ss");
                this.MessagesHistory.Text = "OpenFin connecting... failed at " + time + "\n" + e.ToString();
                this.Title = AppName + " - OpenFin Failed";
            };

            _runtime.Connect(() =>
            {
                Console.WriteLine("connected to openfin");
            
                this.Dispatcher.Invoke(() =>
                { 
                    var time = DateTime.Now.ToString("hh:mm:ss");
                    this.MessagesHistory.Text = "OpenFin connecting... done at " + time; 
                    this.Title = AppName + " - OpenFin Connected";
                    this.StockList.IsEnabled = true;          
                });  
                
                // creating Openfin App
                var guid = Guid.NewGuid().ToString();
                var appOptions = new Openfin.Desktop.ApplicationOptions("IGFinTickerWPFDemo", "IGFinTickerWPFDemo-" + guid, "https://www.infragistics.com/openfin");
                _appOptions = appOptions;
                var app = _runtime.CreateApplication(appOptions);

                app.Run(() =>
                {
                    Console.WriteLine("The application is now running!");
                    _runtime.InterApplicationBus.subscribe("*", "FDC3", onMessageRecived);
                });
            });                
        }

         
        private int MessagesCount = 0;

        private void onMessageRecived(string uid, string topic, object message)
        { 
            this.Dispatcher.Invoke(() =>
            {
                this.MessagesCount++;
                var info = "Message #" + this.MessagesCount;
                info += " recived at " + DateTime.Now.ToString("hh:mm:ss") + ": \n";
                info += "------------------------------------\n";
                info += message.ToString() + "\n";
                info += "------------------------------------\n";
                this.MessagesHistory.Text = info + this.MessagesHistory.Text;     
                Console.WriteLine(info);
            
            });            
        }
                
        private void OnStockSend(object sender, RoutedEventArgs e)
        {           
            if (this.StockList.SelectedItems.Count == 0)
                return;

            // creating FDC3 data context
            var dataContext = new Fdc3DataContext();
            
            // adding single/multiple stocks to FDC3 data
            foreach (var item in this.StockList.SelectedItems)
            {
                var symbol = (string)item;
                var dataItem = new Fdc3DataItem(symbol);
 
                dataContext.data.Add(dataItem); 
            }  
            
            // creating FDC3 message
            var msg = new Fdc3Message {
                intent = "ViewChart",
                context = dataContext
            };

            // converting FDC3 object to json object
            var jsonObj = msg.ToJsonObject();

            // sending FDC3 message
            _runtime.InterApplicationBus.publish("FDC3", jsonObj);  
        }

        private void OnClearHistory(object sender, RoutedEventArgs e)
        {
            this.MessagesCount = 0;
            this.MessagesHistory.Text = "";  
        }
    }


    public class Fdc3Message
    {        
        public string intent { get; set; }
        public Fdc3DataContext context { get; set; }

        public JObject ToJsonObject()
        {
            var str = JsonConvert.SerializeObject(this, Formatting.Indented);
            dynamic json = JsonConvert.DeserializeObject(str);
            return json;
        }
    }    

    public class Fdc3DataContext
    {
        public Fdc3DataContext()
        {
            this.obj = "fdc3-context";
            this.version = "1.0.0";
            this.definition = "https://fdc3.org/context/1.0.0/";
            this.data = new List<Fdc3DataItem>();
        }

        [JsonProperty(PropertyName = "object")]
        public string obj { get; set; }

        public string version { get; set; }
        public string definition { get; set; }

        public List<Fdc3DataItem> data { get; set; }

        public string ToJsonString()
        {
            var str = JsonConvert.SerializeObject(this, Formatting.Indented);
            return str;
        }         
    }    

    public class Fdc3DataItem
    {
        public Fdc3DataItem(string ticker)
        {
            this.type = "security";
            this.name = ticker + " Company"; 
            this.id = new Fdc3DataID();
            this.id.Ticker = ticker; 
            this.id.Default = ticker; 
        }
        
        public string type { get; set; }
        public string name { get; set; }        
        public Fdc3DataID id { get; set; }
    }
    
    public class Fdc3DataID
    {
        public Fdc3DataID()
        {
            var idn = RandEx.GetRandomNum(10000, 90000);
            this.ISIN = "US" + idn;
            this.CUSIP = idn.ToString();
            this.FIGI = RandEx.GetRandomString(10);  
        }

        [JsonProperty(PropertyName = "ticker", Order = 0)]
        public string Ticker { get; set; }

        [JsonProperty(PropertyName = "default", Order = 1)]
        public string Default { get; set; }
              
        [JsonProperty(Order = 2)]     
        public string CUSIP { get; set; }
        [JsonProperty(Order = 3)]     
        public string ISIN { get; set; }    
        [JsonProperty(Order = 4)]     
        public string FIGI { get; set; }  
    }
    
    public class RandEx
    {
        private static Random rand = new Random();

        public static string GetRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[rand.Next(s.Length)]).ToArray());
        }
        
        public static int GetRandomNum(int min, int max)
        { 
            return rand.Next(min, max);
        }

        public static int GetRandomNum(int length)
        {
            var min = Math.Pow(10, (length - 1));
            var max = 9 * min;
            return rand.Next((int)min, (int)max);
        }   
    }
}
