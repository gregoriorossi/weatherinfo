import React, { useState, useEffect } from 'react';

export default function SearchBox() {

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('https://localhost:7177/weatherForecast/searchlocationBytext/udin')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// setPosts(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
	<h1>Search box</h1>
	);
}