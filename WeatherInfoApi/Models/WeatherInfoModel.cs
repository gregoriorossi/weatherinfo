namespace WeatherInfoApi.Models
{
    public class WeatherInfoModel
    {
        public string @base { get; set; }
        public CloudsModel clouds { get; set; }
        public int cod { get; set; }
        public CoordModel coord { get; set; }
        public int dt { get; set; }
        public int id { get; set; }
        public MainSectionModel main { get; set; }
        public string name { get; set; }
        public SysModel sys { get; set; }
        public int timezone { get; set; }
        public int visibility { get; set; }
        public List<WeatherModel> weather { get; set; }
        public WindModel wind { get; set; }
    }


    public class CloudsModel
    {
        public int all { get; set; }
    }

    public class CoordModel
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }

    public class MainSectionModel
    {
        public double feels_like { get; set; }
        public int humidity { get; set; }
        public int pressure { get; set; }
        public double temp { get; set; }
        public double temp_max { get; set; }
        public double temp_min { get; set; }
    }

    public class SysModel
    {
        public string country { get; set; }
        public int id { get; set; }
        public int sunrise { get; set; }
        public int sunset { get; set; }
        public int type { get; set; }
    }

    public class WeatherModel
    {
        public string description { get; set; }
        public string icon { get; set; }
        public int id { get; set; }
        public string main { get; set; }
    }

    public class WindModel
    {
        public int deg { get; set; }
        public double gust { get; set; }
        public double speed { get; set; }
    }
}
