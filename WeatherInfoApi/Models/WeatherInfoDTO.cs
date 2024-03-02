namespace WeatherInfoApi.Models
{
    public class WeatherInfoDTO
    {
        public string name { get; set; } = string.Empty;
        public string country { get; set; } = string.Empty;
        public int cloudsCover { get; set; }
        public CoordinatesDTO coordinates { get; set; }
        public TemparaturesDTO temperatures { get; set; }
        public string weatherDescription { get; set; } = string.Empty;

        public WeatherInfoDTO() { }

        public WeatherInfoDTO(WeatherInfoModel model)
        {
            name = model.name;
            country = model.sys.country;
            cloudsCover = model.clouds.all;
            coordinates = new CoordinatesDTO
            {
                lat = model.coord.lat,
                lon = model.coord.lon
            };
            temperatures = new TemparaturesDTO
            {
                currentTemperature = model.main.temp,
                maxTemperature = model.main.temp_max,
                minTemperature = model.main.temp_min
            };
            var weatherDescription = model.weather.FirstOrDefault();
            if (weatherDescription != null)
            {
                string main = weatherDescription.main;
                string description = weatherDescription.description;
                this.weatherDescription = $"{main}: {description}";
            }

        }
    }

    public class CoordinatesDTO
    {
        public double lat { get; set; }
        public double lon { get; set; }

    }

    public class TemparaturesDTO
    {
        public double currentTemperature { get; set; }
        public double maxTemperature { get; set; }
        public double minTemperature { get; set; }
    }
}
