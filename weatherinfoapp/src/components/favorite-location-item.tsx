import { resolve } from "inversify-react";
import React from "react";
import { Component } from "react";
import { IFavoriteLocation } from "../models/favorite-locations.models";
import { IWeatherInfoService } from "../models/services.models";

type FavoriteLocationItemProps = {
	Location: IFavoriteLocation;
	Index: number;
}

type FavoriteLocationItemState = {
	WeatherDescription?: string;
}

export class FavoriteLocationItem extends Component<FavoriteLocationItemProps, FavoriteLocationItemState> {

	@resolve("WeatherInfoService") private weatherInfoService!: IWeatherInfoService;

	async componentWillMount() {
		const location: IFavoriteLocation = this.props.Location;
		const result = await this.weatherInfoService.WeatherInfo(location.Lat, location.Lon);

		
		this.setState({
			WeatherDescription: result?.weatherDescription
		});
	}


	render() {
		const location: IFavoriteLocation = this.props.Location;

		return (
			<li className="list-group-item" key={this.props.Index}>{location.Name} ({location.Country}): {this.state?.WeatherDescription}</li>
		);
	}
}