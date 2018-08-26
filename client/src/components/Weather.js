import React, { Component } from 'react';
import Form from './Form';

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
			city: undefined,
			error: undefined
		};
	}

	getWeather = (e) => {
		e.preventDefault();
		fetch(`/weather/${e.target.elements.cityName.value}`)
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => {
				console.log(data);
				if (data.cod == 200) {
					this.setState({
						temp: data.main.temp,
						high: data.main.temp_max,
						low: data.main.temp_min,
						state: data.weather[0].main,
						desc: data.weather[0].description,
						humidity: data.main.humidity,
						country: data.sys.country,
						city: data.name,
						error: undefined
					});
				}
				else {
					this.setState({
						temp: undefined,
						high: undefined,
						low: undefined,
						state: undefined,
						desc: undefined,
						humidity: undefined,
						country: undefined,
						city: undefined,
						error: data.message
					});
				}
			});
	}

	render() {
		return (
			<div className="Weather">
				<Form getWeather={this.getWeather} />
				<h1>Weather</h1>
				{
					this.state.city &&
					this.state.country &&
					<p>Location: {this.state.city}, {this.state.country}</p>
				}
				{
					this.state.temp &&
					<p>Temperature: {this.state.temp}&#176; F</p>
				}
				{
					this.state.high &&
					<p>High: {this.state.high}&#176; F</p>
				}
				{
					this.state.low &&
					<p>Low: {this.state.low}&#176; F</p>
				}
				{
					this.state.humidity &&
					<p>Humidity: {this.state.humidity}%</p>
				}
				{
					this.state.state &&
					<p>Status: {this.state.state}</p>
				}
				{
					this.state.desc &&
					<p>Description: {this.state.desc}</p>
				}
				{
					this.state.error &&
					<p>{this.state.error}</p>
				}
			</div>
		);
	}

}

export default Weather;
