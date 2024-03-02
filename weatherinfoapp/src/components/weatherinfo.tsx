import React from "react";
import { Component } from "react";
import { IWeatherInfoResponse } from "../models/weatherInfo.models";

export interface IWeatherInfoProps {
	Info: IWeatherInfoResponse;
}

export class WeatherInfo extends Component<IWeatherInfoProps, {}> {
	render() {

		const info = this.props.Info;

		return (
			<dl className="row mt-3">
				<h4>{info.name} ({info.country})</h4>
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