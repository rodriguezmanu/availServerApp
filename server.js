var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var url = require('url');
var urlExists = require('url-exists');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/api/checkAvailabilityService', (req, res) => {
    urlExists(req.query.url,(err, exists) => {
      if (exists) {
        var response = {
            url: req.query.url,
            priority: req.query.priority
        };
        return res.status(200).send(response);
      } else {
        return res.status(300).send();
      }
    });
});

app.use(express.static(__dirname));

app.listen(process.env.PORT || 8080);
