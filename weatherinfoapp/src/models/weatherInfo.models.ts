export interface ISearchResultModel {
	Text: string;
	IsFavorite: boolean;
	Lat: number;
	Long: number;
}

export interface ISearchLocationByTextResponse {
	name: string,
	lat: number,
	lon: number,
	country: string,
	state: string
}