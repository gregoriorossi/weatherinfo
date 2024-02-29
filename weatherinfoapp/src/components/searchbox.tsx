import React, { useState, useEffect, Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ISearchLocationByTextResponse } from '../models/weatherInfo.models';


type SearchBoxState = {
	
}
export class SearchBox extends Component<{}, SearchBoxState> {

	render() {
		return (
			<Form className="d-flex" >
				<Form.Control
					type="search"
					placeholder="Search"
					className="me-2"
					aria-label="Search" />
				<Button variant="outline-success" > Search </Button>
			</Form>
		);
	}

}

//export class Clock extends Component<{}, {}> {

//    // The tick function sets the current state. TypeScript will let us know
//    // which ones we are allowed to set.
//    tick() {
//        this.setState({
//            time: new Date()
//        });
//    }

//    // Before the component mounts, we initialise our state
//    componentWillMount() {
//        this.tick();
//    }

//    // After the component did mount, we set the state each second.
//    componentDidMount() {
//        setInterval(() => this.tick(), 1000);
//    }

//    // render will know everything!
//    render() {
//        return <p>The current time is test</p>
//    }
//}

//export default class SearchBox extends Component {

//	const [suggestions, favorites] = useState([]);

//	//useEffect(() => {
//	//	fetch('https://localhost:7177/weatherForecast/searchlocationBytext/udin')
//	//		.then((response) => response.json())
//	//		.then((data: ISearchLocationByTextResponse) => {
// //               console.log(data);
// //               // setPosts(data);
// //           })
//	//		.catch((err) => {
//	//			console.log(err.message);
//	//		});
//	//}, []);

//	render() {
//		return (
//			<Form className= "d-flex" >
//					<Control
//					  type="search"
//				placeholder = "Search"
//				className = "me-2"
//				aria - label="Search"
//					/>
//					<Button variant="outline-success" > Search < /Button>
//						< /Form>
//			);
//	}

//};
