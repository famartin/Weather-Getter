var express = require('express');
var fetch = require('node-fetch');
var app = express();

app.get('/', (req, res) => {
	fetch('https://openweathermap.org/data/2.5/weather?q=Houston,us&appid=b6907d289e10d714a6e88b30761fae22')
		.then((data) => {
			return (data.json());
		})
		.then((json) => {
			res.send((JSON.stringify(json)));
		});
});

var http = require('http').Server(app);
http.listen(4000, () => {
	console.log('Listening on port 4000');
});
