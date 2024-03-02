import React from "react";
import { Component } from "react";

type FavoriteButtonProps = {
	IsFavorite: boolean;
	OnClick: (action: string) => void;
}

export class FavoriteButton extends Component<FavoriteButtonProps, {}> {

	OnClick = (): void => {
		const action: string = this.props.IsFavorite ? "remove" : "add";
		this.props.OnClick(action);
	}

	render() {

		const imageSrc: string = this.props.IsFavorite ? "/star-selected.png" : "/star-not-selected.svg";
		const altText: string = this.props.IsFavorite ? "Remove from favorites" : "Add to favorites";

		return (
			<a href="#" onClick={this.OnClick} title={altText} role="favorite-button">
				<img src={imageSrc} alt={altText} height="40px" className="ms-3 me-3" />
			</a>
		);
	}
}