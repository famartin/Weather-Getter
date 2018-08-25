var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.send('hello');
});

var http = require('http').Server(app);
http.listen(4000, () => {
	console.log('Listening on port 4000');
});
