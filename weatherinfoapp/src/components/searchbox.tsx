import React, { Component } from 'react';
import { ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ISearchLocationByTextResponse, ISearchResultModel } from '../models/weatherInfo.models';


type SearchBoxState = {
	Results: ISearchResultModel[];
}
export class SearchBox extends Component<{}, SearchBoxState> {

	componentWillMount() {
		this.setState({
			Results: []
		});
	}

	onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

		const text: string = e.target.value;
		const url = 'https://localhost:7177/weatherForecast/searchlocationBytext/{text}'
			.replace('{text}', text);

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


	render() {
		return (
			<Form className="d-flex" >
				<Form.Control
					type="search"
					placeholder="Search"
					onChange={this.onTextInputChange}
					className="me-2"
					aria-label="Search" />
				<Button variant="outline-success">Search</Button>
			</Form>
		);
	}

}
