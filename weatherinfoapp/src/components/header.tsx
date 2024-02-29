import React from "react";
import { Component } from "react";

type HeaderState = {

};

export class Header extends Component<{}, HeaderState> {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Weather Info App</a>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Favorites</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}