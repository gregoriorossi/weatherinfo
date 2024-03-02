import { Container } from "inversify";
import { IWeatherInfoService } from "./models/services.models";
import { WeatherInfoService } from "./services/weatherinfo.service";


export const container = new Container();
container.bind<IWeatherInfoService>("WeatherInfoService").to(WeatherInfoService);