namespace WeatherInfoApi.Models
{
    public class LocationDTO
    {
        public string name { get; set; } = String.Empty;
        public double lat { get; set; }
        public double lon { get; set; }
        public string country { get; set; } = String.Empty;
        public string region { get; set; } = String.Empty;

        public LocationDTO(LocationModel model)
        {
            name = model.name;
            lat = model.lat;
            lon = model.lon;
            country = model.country;
            region = model.state;
        }
    }
}
