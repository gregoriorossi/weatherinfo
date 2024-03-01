import React from 'react';
import { Component } from 'react';
import './App.css'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Header } from './components/header';
import { SearchBox } from './components/searchbox';

export class App extends Component<{}, {}> {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header></Header>
                    <SearchBox></SearchBox>
                </div>
            </div>

        );
    }
   
}

export default App;
