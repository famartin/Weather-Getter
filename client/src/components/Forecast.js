import React, { Component } from 'react';
import Form from './Form';
import Helpers from '../Helpers';


class Forecast extends Component {
	constructor() {
		super();
		this.state = {
			day1: undefined,
			day2: undefined,
			day3: undefined,
			day4: undefined,
			day5: undefined,
			city: undefined,
			error: undefined
		}
	}

	getForecast = (e) => {
		e.preventDefault();
		fetch(`/api/forecast/${e.target.elements.cityName.value}`)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				if (data.cod === "200") {
					this.setState({
						day1: [],
						day2: [],
						day3: [],
						day4: [],
						day5: []
					});

					var i = 0;
					var day = data.list[i].dt_txt.slice(8, 10);
					while(data.list[i].dt_txt.slice(8, 10) === day) {
						this.setState({
							day1: [...this.state.day1, data.list[i]]
						});
						i++;
					}
					day = data.list[i].dt_txt.slice(8, 10);
					while(data.list[i].dt_txt.slice(8, 10) === day) {
						this.setState({
							day2: [...this.state.day2, data.list[i]]
						});
						i++;
					}
					day = data.list[i].dt_txt.slice(8, 10);
					while(data.list[i].dt_txt.slice(8, 10) === day) {
						this.setState({
							day3: [...this.state.day3, data.list[i]]
						});
						i++;
					}
					day = data.list[i].dt_txt.slice(8, 10);
					while(data.list[i].dt_txt.slice(8, 10) === day) {
						this.setState({
							day4: [...this.state.day4, data.list[i]]
						});
						i++;
					}
					day = data.list[i].dt_txt.slice(8, 10);
					while((i < data.list.length)) {
						if (data.list[i].dt_txt.slice(8, 10) === day) {
							this.setState({
								day5: [...this.state.day5, data.list[i]]
							});
						}
						i++
					}
					this.setState({
						city: data.city.name
					});
				} else {
					this.setState({
						day1: undefined,
						day2: undefined,
						day3: undefined,
						day4: undefined,
						day5: undefined,
						city: undefined,
						error: data.message
					});
				}
			});
	}

	render() {
		return (
			<div className="Forecast col-md-8">
				<h4>5 day forecast.</h4>
				<Form getData={this.getForecast} />
				<div className="ForecastInfo">
				{
					this.state.city &&
					<p>Location: {this.state.city}</p>
				}
				<ul className="day1">
				{
					this.state.day1 &&
					<li>{this.state.day1.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</li>
				}
				{
					this.state.day1 &&
					this.state.day1.map(obj => {
						return (
							<li key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</li>
						);
					})
				}
				</ul>
				<ul className="day2">
				{
					this.state.day2 &&
					<li>{this.state.day2.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</li>
				}
				{
					this.state.day2 &&
					this.state.day2.map(obj => {
						return (
							<li key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</li>
						);
					})
				}
				</ul>
				<ul className="day3">
				{
					this.state.day3 &&
					<li>{this.state.day3.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</li>
				}
				{
					this.state.day3 &&
					this.state.day3.map(obj => {
						return (
							<li key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</li>
						);
					})
				}
				</ul>
				<ul className="day4">
				{
					this.state.day4 &&
					<li>{this.state.day4.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</li>
				}
				{
					this.state.day4 &&
					this.state.day4.map(obj => {
						return (
							<li key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</li>
						);
					})
				}
				</ul>
				<ul className="day5">
				{
					this.state.day5 &&
					<li>{this.state.day5.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</li>
				}
				{
					this.state.day5 &&
					this.state.day5.map(obj => {
						return (
							<li key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</li>
						);
					})
				}
				</ul>
				{
					this.state.error &&
					<p style={{textAlign: 'left', marginTop: '2%'}}>{this.state.error}</p>
				}
				</div>
			</div>
		);
	}
}

export default Forecast;
