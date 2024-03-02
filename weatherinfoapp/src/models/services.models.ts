import { ISearchResultModel, IWeatherInfoResultModel } from "./weatherInfo.models";

export interface IWeatherInfoService {
	SearchLocation(text: string): Promise<ISearchResultModel[]>;
	WeatherInfo(lat: number, lon: number): Promise<IWeatherInfoResultModel | null>;
}

