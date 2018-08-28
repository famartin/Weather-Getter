import React, { Component } from 'react';

class Form extends Component {
	render() {
		return (
			<div className="Form">
				<form onSubmit={this.props.getData} action="/weather" method="get">
					<input type="text" name="cityName" placeholder="City..." autocomplete="off" required></input><br />
					<input className="button" type="submit" value="Submit"></input>
				</form>
			</div>
		);
	}
}

export default Form;
