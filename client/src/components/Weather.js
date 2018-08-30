import React, { Component } from 'react';
import Form from './Form';
import Helpers from '../Helpers';

class Weather extends Component {

	constructor() {
		super();
		this.state = {
			temp: undefined,		
			state: undefined,
			wind: undefined,
			sunrise: undefined,
			sunset: undefined,
			desc: undefined,
			humidity: undefined,
			country: undefined,
			city: undefined,
			error: undefined
		};
	}

	getWeather = (e) => {
		e.preventDefault();
		fetch(`/api/weather/${e.target.elements.cityName.value}`)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				var sunriseDate = new Date(0);
				sunriseDate.setUTCSeconds(data.sys.sunrise);
				console.log(sunriseDate.toString());
				var sunsetDate = new Date(0);
				sunsetDate.setUTCSeconds(data.sys.sunset);
				console.log(sunsetDate.toString());
				if (data.cod === 200) {
					this.setState({
						temp: data.main.temp,
						state: data.weather[0].main,
						wind: data.wind.speed,
						sunrise: sunriseDate.toString().slice(16, 21),
						sunset: sunsetDate.toString().slice(16, 21),
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
						state: undefined,
						wind: undefined,
						sunrise: undefined,
						sunset: undefined,
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
			<div className="Weather col-md-2">
				<h4>current weather.</h4>
				<Form getData={this.getWeather} />
				<ul className="WeatherInfo">
				{
					this.state.city &&
					this.state.country &&
					<li><span className="grey">Location:</span> {this.state.city}, {this.state.country}</li>
				}
				{
					this.state.temp &&
					<li><span className="grey">Temperature:</span> {Math.ceil(this.state.temp)}&#176; F</li>
				}
				{
					this.state.humidity &&
					<li><span className="grey">Humidity:</span> {this.state.humidity}%</li>
				}
				{
					this.state.sunrise &&
					<li><span className="grey">Sunrise:</span> {Helpers.convertTime(this.state.sunrise)}</li>
				}
				{
					this.state.sunset &&
					<li><span className="grey">Sunset:</span> {Helpers.convertTime(this.state.sunset)}</li>
				}
				{
					this.state.wind &&
					<li><span className="grey">Wind:</span> {Math.ceil(this.state.wind)} mph</li>
				}
				{
					this.state.state &&
					<li><span className="grey">Status:</span> {this.state.state}</li>
				}
				{
					this.state.desc &&
					<li><span className="grey">Description:</span> {this.state.desc}</li>
				}
				{
					this.state.error &&
					<li>{this.state.error}</li>
				}
				</ul>
			</div>
		);
	}

}

export default Weather;
