import { resolve } from "inversify-react";
import React from "react";
import { Component } from "react";
import { IFavoriteLocationsService } from "../models/services.models";
import { IWeatherInfoResponse } from "../models/weatherInfo.models";
import { FavoriteButton } from "./favorite-button";

export interface IWeatherInfoProps {
	Info: IWeatherInfoResponse;
	OnFavoriteLocationsUpdated: () => void;
}

export interface IWeatherInfoState {
	IsFavorite: boolean;
}

export class WeatherInfo extends Component<IWeatherInfoProps, IWeatherInfoState> {

	@resolve("FavoriteLocationsService") private favoriteLocationsService!: IFavoriteLocationsService;

	componentWillMount() {

		let isFavorite: boolean = false;

		if (this.props.Info) {
			isFavorite = this.favoriteLocationsService.IsFavoriteLocation(this.props.Info);
		}

		this.setState({
			IsFavorite: isFavorite
		});
	}

	OnFavoriteButtonClick = (action: string): void => {
		if (action === "add") {
			this.favoriteLocationsService.SetFavoriteLocation(this.props.Info);
		} else {
			this.favoriteLocationsService.DeleteFavoriteLocation(this.props.Info);
		}

		this.props.OnFavoriteLocationsUpdated();
		this.setState({
			IsFavorite: action === "add"
		});
	}

	render() {
		const info = this.props.Info;
		

		return (
			<dl className="row mt-3">
				<h4>{info.name} ({info.country}) <FavoriteButton IsFavorite={this.state.IsFavorite} OnClick={this.OnFavoriteButtonClick} /></h4>
				<p>{info.weatherDescription}</p>
				<dt className="col-sm-3">Coordinates</dt>
				<dd className="col-sm-9">Lat: {info.coordinates.lat}, Lon: {info.coordinates.lon}</dd>
				<dt className="col-sm-3">Clouds coverage</dt>
				<dd className="col-sm-9">{info.cloudsCover}%</dd>
				<dt className="col-sm-3">Current Temperature</dt>
				<dd className="col-sm-9">{info.temperatures.currentTemperature}&deg;</dd>
				<dt className="col-sm-3">Max Temperature</dt>
				<dd className="col-sm-9">{info.temperatures.maxTemperature}&deg;</dd>
				<dt className="col-sm-3">Min Temperature</dt>
				<dd className="col-sm-9">{info.temperatures.minTemperature}&deg;</dd>
			</dl>
		);
	}
}