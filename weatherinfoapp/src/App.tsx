import "reflect-metadata";
import React from 'react';
import { Component } from 'react';
import './App.css'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Header } from './components/header';
import { SearchBox } from './components/searchbox';
import { Provider } from "inversify-react";
import { container } from "./ioc";

export class App extends Component<{}, {}> {
    render() {
        return (
            <Provider container={container}>
                <div className="container">
                    <div className="row">
                        <Header></Header>
                        <SearchBox></SearchBox>
                    </div>
                </div>
            </Provider>
        );
    }
   
}

export default App;
