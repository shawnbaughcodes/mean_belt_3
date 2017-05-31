var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

console.log('connecting to database...')

mongoose.connect('mongodb://localhost/mean_belt_3')

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('js') >= 0){
        console.log('loading ' + file +'...');
        require(models_path + '/' + file);
    }
})
