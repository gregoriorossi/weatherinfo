import React from "react";
import { Component } from "react";


export class Header extends Component<{}, {}> {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<img src="/sun.png" role="app-logo" alt="image" height="50px" className="ms-3 me-3" />

				<a className="navbar-brand" href="#">Weather Info App</a>

			</nav>
		);
	}
}