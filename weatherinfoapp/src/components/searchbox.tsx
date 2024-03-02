import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { IWeatherInfoService } from '../models/services.models';
import { ISearchResultModel, IWeatherInfoResultModel } from '../models/weatherInfo.models';


type SearchBoxState = {
	Results: ISearchResultModel[];
}

type SearchBoxProps = {
	OnLocationSelected: (location: IWeatherInfoResultModel) => void;
}

export class SearchBox extends Component<SearchBoxProps, SearchBoxState> {

	@resolve("WeatherInfoService") private weatherInfoService!: IWeatherInfoService;

	componentWillMount() {
		this.resetResults();
	}

	onTextInputChange = async (location: string): Promise<void> => {

		if (!location) {
			this.resetResults();
			return;
		}

		const locationsResult = await this.weatherInfoService.SearchLocation(location);
		this.setState({
			Results: locationsResult
		});
		console.log("weather info", locationsResult);

		
	}

	onTypeaheadChange = async (options: any[]): Promise<void> => {
		if (!options.length) {
			return;
		}

		const option = options[0] as ISearchResultModel;
		const lat: number = option.Lat;
		const lon: number = option.Long;

		const weatherInfoResult: IWeatherInfoResultModel|null = await this.weatherInfoService.WeatherInfo(lat, lon);
		if (weatherInfoResult) {
			this.props.OnLocationSelected(weatherInfoResult);
		}
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
			<div className="mt-2">
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
