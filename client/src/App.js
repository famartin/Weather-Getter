import React, { Component } from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import './App.css';

class App extends Component {
	render() {
    	return (
			<div className="App container-fluid">
				<div className="row MainRow">
					<Weather />
					<Forecast />
				</div>
			</div>
		);
	}
}

export default App;
