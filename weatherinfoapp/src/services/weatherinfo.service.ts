import { injectable } from "inversify";
import { IWeatherInfoService } from "../models/services.models";
import { ISearchResultModel } from "../models/weatherInfo.models";

@injectable()
export class WeatherInfoService implements IWeatherInfoService {

    SearchLocation(_text: string): Promise<ISearchResultModel[]> {
        return Promise.resolve([]);
    }

}