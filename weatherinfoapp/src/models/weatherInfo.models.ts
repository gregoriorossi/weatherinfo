export interface ISearchResultModel {
	Text: string;
	IsFavorite: boolean;
	Lat: number;
	Long: number;
	Region: string;
}

export interface ISearchLocationByTextResponse {
	name: string;
	lat: number;
	lon: number;
	country: string;
	region: string;
}

export interface IWeatherInfoResponse {
	name: string
	country: string
	cloudsCover: number
	coordinates: ICoordinates
	temperatures: ITemperatures
	weatherDescription: string
}

export interface ICoordinates {
	lat: number
	lon: number
}

export interface ITemperatures {
	currentTemperature: number
	maxTemperature: number
	minTemperature: number
}


export interface IWeatherInfoResultModel extends IWeatherInfoResponse {

}