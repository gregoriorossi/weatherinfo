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
        public async Task<IEnumerable<LocationDTO>> SearchLocationByText(string query)
        {
            try
            {
                string searchLocationByTextUrl = _weatherInfoConfig.SearchLocationByTextUrl;
                string url = searchLocationByTextUrl
                    .Replace("{location}", query)
                    .Replace("{ApiKey}", _weatherInfoConfig.ApiKey);

                var httpRequestMessage = new HttpRequestMessage(
                    HttpMethod.Get,
                    url);

                HttpClient httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    string content = await httpResponseMessage.Content.ReadAsStringAsync();
                    var result = JsonSerializer.Deserialize<IEnumerable<LocationModel>>(content);

                    return result.Select(x => new LocationDTO(x));
                }
            } catch(Exception ex)
            {
                _logger.LogError(ex, "SearchLocationByText");
                throw;
            }

            return Array.Empty<LocationDTO>();
        }

        [HttpGet("WeatherInfo/{lat}/{lon}")]
        public async Task<WeatherInfoDTO> WeatherInfo(string lat, string lon)
        {
            try
            {
                string weatherInfoUrl = _weatherInfoConfig.WeatherInfoUrl;
                string url = weatherInfoUrl
                    .Replace("{lat}", lat)
                    .Replace("{lon}", lon)
                    .Replace("{ApiKey}", _weatherInfoConfig.ApiKey);

                var httpRequestMessage = new HttpRequestMessage(
                    HttpMethod.Get,
                    url);

                HttpClient httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    string content = await httpResponseMessage.Content.ReadAsStringAsync();
                    var result = JsonSerializer.Deserialize<WeatherInfoModel>(content);

                    return new WeatherInfoDTO(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "SearchLocationByText");
                throw;
            }

            return new WeatherInfoDTO();
        }
    }
}