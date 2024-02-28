using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WeatherInfoApi.Models;

namespace WeatherInfoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly WeatherInfoConfig _weatherInfoConfig = new WeatherInfoConfig();
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(
            IConfiguration configuration,
            IHttpClientFactory httpClientFactory,
            ILogger<WeatherForecastController> logger)
        {
            configuration.GetSection(WeatherInfoConfig.WeatherInfo).Bind(_weatherInfoConfig);
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        [HttpGet("SearchLocationByText/{query}")]
        public async Task<IEnumerable<LocationModel>> SearchLocationByText(string query)
        {
            try
            {
                string searchLocationByTextUrl = _weatherInfoConfig.SearchLocationByTextUrl;
                string url = searchLocationByTextUrl.Replace("{location}", query);
                var httpRequestMessage = new HttpRequestMessage(
                    HttpMethod.Get,
                    url);


                HttpClient httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    string content = await httpResponseMessage.Content.ReadAsStringAsync();
                    var result = JsonSerializer.Deserialize<IEnumerable<LocationModel>>(content);

                    return result;
                }
            } catch(Exception ex)
            {
                _logger.LogError(ex, "SearchLocationByText");
            }

            return Array.Empty<LocationModel>();
        }
    }
}