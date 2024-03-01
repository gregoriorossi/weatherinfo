import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { ISearchLocationByTextResponse, ISearchResultModel } from '../models/weatherInfo.models';


type SearchBoxState = {
	Results: ISearchResultModel[];
}
export class SearchBox extends Component<{}, SearchBoxState> {

	componentWillMount() {
		this.resetResults();
	}

	onTextInputChange = (location: string): void => {

		if (!location) {
			this.resetResults();
			return;
		}
		const url = 'https://localhost:7177/weatherForecast/searchlocationBytext/{text}'
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

	handleClick = (e: any) => {
		// console.log("handle click", e);
	}

	renderMenuItemChildren = (option: any) => {
		// console.log("renderMenuItem", option);
		return <div onClick={(e) => this.handleClick(e)}>
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
