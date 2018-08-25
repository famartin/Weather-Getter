var express = require('express');
var fetch = require('node-fetch');
var app = express();

app.get('/weather', (req, res) => {
	fetch('http://api.openweathermap.org/data/2.5/weather?q=Houston,us&units=imperial&appid=d1cb07c66c7dec87991233db29cbbe78')
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
