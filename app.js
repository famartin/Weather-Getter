var express = require('express');
var fetch = require('node-fetch');
var path = require('path');
var app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

/** API Key **/
const appId = 'd1cb07c66c7dec87991233db29cbbe78';

/** API Call to Get Current weather **/

app.get('/api/weather/:cityName', (req, res) => {
	console.log(req.params.cityName);// eslint-disable-next-line
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=imperial&appid=${appId}`)
		.then((data) => {
			return (data.json());
		})
		.then((json) => {
			console.log(json);
			res.send(json);
		});
});

/** API call to Get 5 Day Forecast **/

app.get('/api/forecast/:cityName', (req, res) => {
	// eslint-disable-next-line
	fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.params.cityName}&units=imperial&appid=${appId}`)
		.then((data) => {
			return (data.json());
		})
		.then((json) => {
			console.log(json);
			res.send(json);
		});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

var port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log('Listening on port 4000');
});
