var express = require('express'),
    bp = require('body-parser'),
    mongoose = require('mongoose'),
    root = __dirname,
    port = process.env.PORT || 8000,
    app = express();

app.use(express.static(root + '/client'));
app.use(express.static(root + '/bower_components'));
app.use(bp.json());

require('./server/config/mongoose');
require('./server/config/routes');
require('./server/config/routes')(app);

mongoose.Promise = global.Promise;

app.listen(port, function(){
    console.log('Running on port 8000....mean...belt...3....bruh');
});
