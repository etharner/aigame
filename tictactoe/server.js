const express = require('express');

var app = express();
app.use(express.static(__dirname + '/static'));

app.get('/', function (request, response) {
  response.render('index');
})

app.listen(8080, function () {
  console.log('Server listening on port 8080.');
})
