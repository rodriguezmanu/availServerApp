var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var url = require('url');
var urlExists = require('url-exists');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/api/checkAvailabilityService', (req, res) => {
    urlExists(req.body.url,(err, exists) => {
      if (exists) {
        return res.status(200).send(req.body);
      } else {
        return res.status(300).send();
      }
    });
});

app.use(express.static(__dirname));

app.listen(process.env.PORT || 8080);
