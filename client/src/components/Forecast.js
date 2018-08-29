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
			city: undefined
		}
	}

	/*formatDate = (date) => {
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]

		var dayOfWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]

		var array = date.split('-');
		var month = Number(array[1]);
		var day = Number(array[2]);
		var cc = Number(array[0].slice(0, 2));
		var yy = Number(array[0].slice(2));
		var mm;
		var result;
		cc = (Math.floor(cc / 4)) - (2 * cc) - 1;
		yy = Math.floor((5 * yy) / 4);
		mm = Math.floor((26 * (month + 1)) / 10);
		result = (yy + cc + mm + day) % 7;

		return (dayOfWeek[result] + " " + months[month - 1] + " " + array[2]);
	}*/

	/*static convertTime = (time) => {
		var array = time.split(':');

		var hours = Number(array[0]);
		var minutes = Number(array[1]);

		var timeValue;

		if (hours > 0 && hours <= 12) {
			timeValue= "" + hours;
		} else if (hours > 12) {
			timeValue= "" + (hours - 12);
		} else if (hours === 0) {
			timeValue= "12";
		}

		timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
		timeValue += (hours >= 12) ? " pm" : " am";

		return (timeValue);
	}*/

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
						city: undefined
					});
				}
			});
	}

	render() {
		return (
			<div className="Forecast col-md-6 offset-md-1">
				<h4>5 day forecast.</h4>
				<Form getData={this.getForecast} />
				<ul className="ForecastInfo">
				{
					this.state.city &&
					<p>Location: {this.state.city}</p>
				}
				{
					this.state.day1 &&
					<div>{this.state.day1.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</div>
				}
				{
					this.state.day1 &&
					this.state.day1.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day2 &&
					<div>{this.state.day2.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</div>
				}
				{
					this.state.day2 &&
					this.state.day2.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day3 &&
					<div>{this.state.day3.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</div>
				}
				{
					this.state.day3 &&
					this.state.day3.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day4 &&
					<div>{this.state.day4.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</div>
				}
				{
					this.state.day4 &&
					this.state.day4.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day5 &&
					<div>{this.state.day5.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{Helpers.formatDate(obj.dt_txt.slice(0, 10))}
							</div>
						);
					})}</div>
				}
				{
					this.state.day5 &&
					this.state.day5.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{Helpers.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				</ul>
			</div>
		);
	}
}

export default Forecast;
