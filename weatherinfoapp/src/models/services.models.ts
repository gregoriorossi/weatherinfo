import { IFavoriteLocation } from "./favorite-locations.models";
import { ISearchResultModel, IWeatherInfoResponse, IWeatherInfoResultModel } from "./weatherInfo.models";

export interface IWeatherInfoService {
	SearchLocation(text: string): Promise<ISearchResultModel[]>;
	WeatherInfo(lat: number, lon: number): Promise<IWeatherInfoResultModel | null>;
}

export interface IFavoriteLocationsService {
	GetFavoriteLocations(): IFavoriteLocation[];
	SetFavoriteLocation(location: IWeatherInfoResponse): void;
	DeleteFavoriteLocation(location: IWeatherInfoResponse): void;
	IsFavoriteLocation(location: IWeatherInfoResultModel): boolean;
}
