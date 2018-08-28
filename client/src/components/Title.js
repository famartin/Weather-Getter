import React, { Component } from 'react';

class Title extends Component {
	render() {
		return (
			<div className="Title">
				<h1>Weather Getter</h1>
				<p>Enter the city name below to retrieve current weather and next 5 day forecast</p>
			</div>
		);
	}
}

export default Title;
