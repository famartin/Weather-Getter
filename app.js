var express = require('express');
var fetch = require('node-fetch');
var app = express();

app.get('/weather/:cityName', (req, res) => {
	const appId = 'd1cb07c66c7dec87991233db29cbbe78';
	console.log(req.params.cityName);
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=imperial&appid=${appId}`)
		.then((data) => {
			return (data.json());
		})
		.then((json) => {
			console.log(json);
			res.send(json);
		});
});

var http = require('http').Server(app);
http.listen(4000, () => {
	console.log('Listening on port 4000');
});
