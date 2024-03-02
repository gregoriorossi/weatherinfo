import { ISearchResultModel } from "./weatherInfo.models";

export interface IWeatherInfoService {
	SearchLocation(text: string): Promise<ISearchResultModel[]>;
}