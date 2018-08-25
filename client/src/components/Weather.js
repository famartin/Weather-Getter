import React, { Component } from 'react';

class Weather extends Component {

	constructor() {
		super();
		this.state = {
			temp: undefined,
			high: undefined,
			low: undefined,
			state: undefined,
			desc: undefined,
			humidity: undefined,
			country: undefined,
			city: undefined
		};
	}

	componentDidMount() {
		fetch('/weather')
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => {
				console.log(data);
				this.setState({
					temp: data.main.temp,
					high: data.main.temp_max,
					low: data.main.temp_min,
					state: data.weather[0].main,
					desc: data.weather[0].description,
					humidity: data.main.humidity,
					country: data.sys.country,
					city: data.name
				});
			});
	}

	render() {
		return (
			<div className="Weather">
				<h1>Weather</h1>
				<p>Temperature: {this.state.temp}</p>
				<p>High: {this.state.high}</p>
				<p>Low: {this.state.low}</p>
				<p>Humidity: {this.state.humidity}%</p>
				<p>Status: {this.state.state}</p>
				<p>Description: {this.state.desc}</p>
				<p>Location: {this.state.city}, {this.state.country}</p>
			</div>
		);
	}
}

export default Weather;
