import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { IWeatherInfoService } from '../models/services.models';
import { ISearchLocationByTextResponse, ISearchResultModel } from '../models/weatherInfo.models';


type SearchBoxState = {
	Results: ISearchResultModel[];
}
export class SearchBox extends Component<{}, SearchBoxState> {

	@resolve("WeatherInfoService") private weatherInfoService!: IWeatherInfoService;

	async componentWillMount() {
		this.resetResults();

		const result = await this.weatherInfoService.SearchLocation("gfdfdsds");
		console.log("weather info", result);
	}

	onTextInputChange = (location: string): void => {

		if (!location) {
			this.resetResults();
			return;
		}
		const url = process.env.REACT_APP_SEARCH_LOCATION_BY_TEXT_URL!
			.replace('{text}', location);

		fetch(url)
			.then((response) => response.json())
			.then((data: ISearchLocationByTextResponse[]) => {
				console.log(data);
				this.buildResults(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	onTypeaheadChange = (e: any): void => {
		console.log(e);
	}

	private buildResults(response: ISearchLocationByTextResponse[]): void {

		const result: ISearchResultModel[] = response.map((x): ISearchResultModel => ({
			Text: x.name,
			IsFavorite: false,
			Lat: x.lat,
			Long: x.lon
		}));

		this.setState({
			Results: result
		});
	}

	onSuggestionSelected = (selected: any): void => {
		console.log("on suggestion selected", selected);
	}

	resetResults = ():void => {
		this.setState({
			Results: []
		});
	}

	renderMenuItemChildren = (option: any) => {
		return <div>
			{option.Text}
		</div>
	}

	render() {
		return (
			<div>
				<Typeahead
					id="searchlocation-input"
					onChange={this.onTypeaheadChange}
					onInputChange={this.onTextInputChange}
					labelKey="Text"
					placeholder="Choose a location"
					options={this.state.Results}
					renderMenuItemChildren={this.renderMenuItemChildren}>
				</Typeahead>
			</div>
			
		);
	}

}
