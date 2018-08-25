import React, { Component } from 'react';

class Weather extends Component {

	constructor() {
		super();
		this.state = {
			weather: {}
		};
	}

	componentDidMount() {
		fetch('/weather')
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(weather => {
				console.log(weather);
				this.setState({ weather })
			});
	}

	render() {
		return (
			<div className="Weather">
				<h1>Weather</h1>
				<p>Temperature: {this.state.weather.temp}</p>
				<p>High: {this.state.weather.temp_max}</p>
				<p>Low: {this.state.weather.temp_min}</p>
			</div>
		);
	}
}

export default Weather;
