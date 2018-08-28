import React, { Component } from 'react';

class Form extends Component {
	render() {
		return (
			<div className="Form">
				<form onSubmit={this.props.getData} action="/weather" method="get">
					City: <input type="text" name="cityName" placeholder="City" required></input><br />
					<input type="submit" value="Submit"></input>
				</form>
			</div>
		);
	}
}

export default Form;
