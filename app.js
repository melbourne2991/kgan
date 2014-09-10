var express		= require('express');
var app 		= express();

app.use(express.static(__dirname + '/public'));

if(app.listen(3002)) console.log('App Listening on ' + '3002');


