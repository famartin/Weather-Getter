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

	getForecast = (e) => {
		e.preventDefault();
		fetch(`/forecast/${e.target.elements.cityName.value}`)
			.then(res => {
				//console.log(res);
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
					while(i < 7) {
						this.setState({
							day1: [...this.state.day1, data.list[i]]
						});
						i++;
					}
					while(i < 15) {
						this.setState({
							day2: [...this.state.day2, data.list[i]]
						});
						i++;
					}
					while(i < 23) {
						this.setState({
							day3: [...this.state.day3, data.list[i]]
						});
						i++;
					}
					while(i < 31) {
						this.setState({
							day4: [...this.state.day4, data.list[i]]
						});
						i++;
					}
					while(i < 39) {
						this.setState({
							day5: [...this.state.day5, data.list[i]]
						});
						i++
					}

					this.setState({
						city: data.city.name
					});
				} else {
					this.setState({
						temp: undefined
					});
				}
			});
	}

	render() {
		return (
			<div style={{border: '1px solid black'}} className="Forecast">
				<Form getData={this.getForecast} />
				<h1>5 Day Forecast</h1>
				{this.state.city && <p>Location: {this.state.city}</p>}
				{this.state.day1 && <p>Day 1:</p>}
				{this.state.day1 && this.state.day1.map(obj => {
					return (
						<div key={obj.dt}>
							<p>{obj.dt_txt} -- {obj.main.temp}</p>
						</div>
					);
				})}
				{this.state.day2 && <p>Day 2:</p>}
				{this.state.day2 && this.state.day2.map(obj => {
					return (
						<div key={obj.dt}>
							<p>{obj.dt_txt} -- {obj.main.temp}</p>
						</div>
					);
				})}
				{this.state.day3 && <p>Day 3:</p>}
				{this.state.day3 && this.state.day3.map(obj => {
					return (
						<div key={obj.dt}>
							<p>{obj.dt_txt} -- {obj.main.temp}</p>
						</div>
					);
				})}
				{this.state.day4 && <p>Day 4:</p>}
				{this.state.day4 && this.state.day4.map(obj => {
					return (
						<div key={obj.dt}>
							<p>{obj.dt_txt} -- {obj.main.temp}</p>
						</div>
					);
				})}
				{this.state.day5 && <p>Day 5:</p>}
				{this.state.day5 && this.state.day5.map(obj => {
					return (
						<div key={obj.dt}>
							<p>{obj.dt_txt} -- {obj.main.temp}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Forecast;
