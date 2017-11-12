const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const allowedOrigin = process.env.ORIGIN || '*';

app.get('/', (req, res) => {
	res.send('Hi there! This is a proxy service that allows me to display my medium.com posts on the website.');
});

app.get('/posts', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', allowedOrigin);
	res.header('Access-Control-Allow-Methods', 'GET');

	// handle preflight requests
	if (req.method === 'OPTIONS') {
		res.send();
	} else {
		const url = 'https://medium.com/@' + (req.query.slug || process.env.SLUG || 'dheerajhere') +'/latest?format=json';
		request({url: url, method: 'GET'}, (err, res) => {
			if (err) {
				console.log('Error: ' + res.statusCode);
			}
		}).pipe(res);
	}
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log('Application started on port ' + app.get('port')));