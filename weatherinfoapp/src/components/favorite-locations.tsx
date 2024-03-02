import EventEmitter from "events";
import { resolve } from "inversify-react";
import React from "react";
import { Component } from "react";
import { IFavoriteLocation } from "../models/favorite-locations.models";
import { IFavoriteLocationsService } from "../models/services.models";

type FavoriteLocationsState = {
	favoriteLocations: IFavoriteLocation[]
}

type FavoriteLocationsProps = {
	ShouldUpdate: EventEmitter;
}

export class FavoriteLocations extends Component<FavoriteLocationsProps, FavoriteLocationsState> {
	@resolve("FavoriteLocationsService") private favoriteLocationsService!: IFavoriteLocationsService;

	componentWillMount() {
		this.LoadFavoriteLocations();

		this.props.ShouldUpdate.on("updateFavorites", () => {
			this.LoadFavoriteLocations();
		});
	}

	private LoadFavoriteLocations = (): void => {
		const favoriteLocations = this.favoriteLocationsService.GetFavoriteLocations();

		this.setState({
			favoriteLocations: favoriteLocations
		});
	}
	render() {

		const favorites = this.state.favoriteLocations.map((f, index) => 
			<li className="list-group-item" key={index}>{f.Name} ({f.Country})</li>
		)
		return (
			<ul className="list-group mt-3">
				<li className="list-group-item active" aria-current="true" key="favorites-title">Favorite Locations</li>

				{
					this.state.favoriteLocations.length > 0 ?
						favorites :
						<li className="list-group-item"><b>No favorite locations</b></li>
					
				}
			</ul>
		);
	}
}