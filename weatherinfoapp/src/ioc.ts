import { Container } from "inversify";
import { IFavoriteLocationsService, IWeatherInfoService } from "./models/services.models";
import { FavoriteLocationsService } from "./services/favorite-locations.service";
import { WeatherInfoService } from "./services/weatherinfo.service";


export const container = new Container();
container.bind<IWeatherInfoService>("WeatherInfoService").to(WeatherInfoService);
container.bind<IFavoriteLocationsService>("FavoriteLocationsService").to(FavoriteLocationsService);