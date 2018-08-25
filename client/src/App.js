import React, { Component } from 'react';
import Title from './components/Title';
import Weather from './components/Weather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Title />
				<Weather />
      </div>
    );
  }
}

export default App;
