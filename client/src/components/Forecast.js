import React, { Component } from 'react';
import Form from './Form';


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

	convertTime = (time) => {
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

		timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
		timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM

		return (timeValue);
	}

	getForecast = (e) => {
		e.preventDefault();
		fetch(`/forecast/${e.target.elements.cityName.value}`)
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
			<div style={{border: '1px solid black'}} className="Forecast">
				<Form getData={this.getForecast} />
				<h1>5 Day Forecast</h1>
				{
					this.state.city &&
					<p>Location: {this.state.city}</p>
				}
				{
					this.state.day1 &&
					<div>Day 1: {this.state.day1.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{obj.dt_txt.slice(5, 10)}
							</div>
						);
					})}</div>
				}
				{
					this.state.day1 &&
					this.state.day1.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{this.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day2 &&
					<div>Day 2: {this.state.day2.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{obj.dt_txt.slice(5, 10)}
							</div>
						);
					})}</div>
				}
				{
					this.state.day2 &&
					this.state.day2.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{this.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day3 &&
					<div>Day 3: {this.state.day3.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{obj.dt_txt.slice(5, 10)}
							</div>
						);
					})}</div>
				}
				{
					this.state.day3 &&
					this.state.day3.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{this.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day4 &&
					<div>Day 4: {this.state.day4.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{obj.dt_txt.slice(5, 10)}
							</div>
						);
					})}</div>
				}
				{
					this.state.day4 &&
					this.state.day4.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{this.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
				{
					this.state.day5 &&
					<div>Day 5: {this.state.day5.slice(0, 1).map((obj) => {
						return (
							<div key={obj.dt_txt}>
								{obj.dt_txt.slice(5, 10)}
							</div>
						);
					})}</div>
				}
				{
					this.state.day5 &&
					this.state.day5.map(obj => {
						return (
							<div key={obj.dt}>
								<p>{this.convertTime(obj.dt_txt.slice(11))} -- {obj.main.temp}</p>
							</div>
						);
					})
				}
			</div>
		);
	}
}

export default Forecast;
