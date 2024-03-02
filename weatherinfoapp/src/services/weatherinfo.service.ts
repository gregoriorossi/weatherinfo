import { injectable } from "inversify";
import { IWeatherInfoService } from "../models/services.models";
import { ISearchLocationByTextResponse, ISearchResultModel, IWeatherInfoResponse, IWeatherInfoResultModel } from "../models/weatherInfo.models";

@injectable()
export class WeatherInfoService implements IWeatherInfoService {

	SearchLocation(text: string): Promise<ISearchResultModel[]> {

		const url = process.env.REACT_APP_SEARCH_LOCATION_BY_TEXT_URL!
			.replace('{text}', text);

		return fetch(url)
			.then((response) => response.json())
			.then((data: ISearchLocationByTextResponse[]) => {
				console.log(data);
				return this.BuildSearchLocationResults(data);
			})
			.catch((err) => {
				console.log(err.message);
				return [];
			});
	}

	WeatherInfo(lat: number, lon: number): Promise<IWeatherInfoResponse | null> {

		const url = process.env.REACT_APP_WEATHER_INFO_URL!
			.replace('{lat}', `${lat}`)
			.replace('{lon}', `${lon}`);

		return fetch(url)
			.then((response) => response.json())
			.then((data: IWeatherInfoResponse) => {
				console.log(data);
				return data;
			})
			.catch((err) => {
				console.log(err.message);
				return null;
			});
	}

	private BuildSearchLocationResults(response: ISearchLocationByTextResponse[]): ISearchResultModel[] {

		const result: ISearchResultModel[] = response.map((x): ISearchResultModel => ({
			Text: x.name,
			IsFavorite: false,
			Lat: x.lat,
			Long: x.lon,
			Region: x.region
		}));

		return result;
	}
}