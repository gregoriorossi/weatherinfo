import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchBox() {

	const [suggestions, favorites] = useState([]);

	useEffect(() => {
		fetch('https://localhost:7177/weatherForecast/searchlocationBytext/udin')
			.then((response) => response.json())
			.then((data: ISearchLocationByTextResponse) => {
                console.log(data);
                // setPosts(data);
            })
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
			<Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
	);
}: