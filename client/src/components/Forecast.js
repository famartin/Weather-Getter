import React, { Component } from 'react';
import Form from './Form';


class Forecast extends Component {
	constructor() {
		super();
		this.state = {
			temp: []
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
					for(var i = 0;i < data.list.length;i++) {
						this.setState({
							temp: [...this.state.temp, data.list[i].main.temp]
						});
					}
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
				<h1>Forecast</h1>
				<p>Temp:{this.state.temp[0]}</p>
			</div>
		);
	}
}

export default Forecast;
