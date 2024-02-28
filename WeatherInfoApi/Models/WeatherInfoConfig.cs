namespace WeatherInfoApi.Models
{
    public class WeatherInfoConfig
    {
        public const string WeatherInfo = "WeatherInfo";

        public string ApiKey { get; set; } = String.Empty;
        public string WeatherInfoUrl { get; set; } = String.Empty;
        public string SearchLocationByTextUrl { get; set; } = String.Empty;
    }
}
