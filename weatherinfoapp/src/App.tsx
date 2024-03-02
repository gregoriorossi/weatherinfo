import "reflect-metadata";
import React from 'react';
import { Component } from 'react';
import './App.css'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Header } from './components/header';
import { SearchBox } from './components/searchbox';
import { Provider } from "inversify-react";
import { container } from "./ioc";
import { WeatherInfo } from "./components/weatherinfo";
import { FavoriteLocations } from "./components/favorite-locations";
import { IWeatherInfoResponse } from "./models/weatherInfo.models";
import EventEmitter from "events";

type AppState = {
    weatherInfo?: IWeatherInfoResponse;
}

export class App extends Component<{}, AppState> {

    private shouldUpdateFavoritesEmitter = new EventEmitter();

    componentWillMount() {
        this.setState({
        });
    }

    OnLocationSelected = (location: IWeatherInfoResponse): void => {
        this.setState({
            weatherInfo: location
        });
    }

    OnFavoriteLocationsUpdated = (): void => {
        this.shouldUpdateFavoritesEmitter.emit("updateFavorites");
    }

    render() {
        return (
            <Provider container={container}>
                <div className="container">
                    <div className="row">
                        <Header></Header>
                        <SearchBox OnLocationSelected={this.OnLocationSelected}></SearchBox>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            {this.state.weatherInfo ?
                                <WeatherInfo
                                    key={this.state.weatherInfo.name }
                                    Info={this.state.weatherInfo}
                                    OnFavoriteLocationsUpdated={this.OnFavoriteLocationsUpdated}
                                    ></WeatherInfo> :
                                <div className="alert alert-warning mt-4">No Location selected</div>
                            }
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <FavoriteLocations ShouldUpdate={this.shouldUpdateFavoritesEmitter}></FavoriteLocations>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
   
}

export default App;
