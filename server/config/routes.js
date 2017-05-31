console.log('Seeing routes');
var fs = require('fs');
var path = require('path');

var Users = require('../controllers/users');
var Surveys = require('../controllers/surveys');
// var Items = require('../controllers/items_controller');

module.exports = function(app) {
    app.get('/users', Users.index)
    app.get('/users/:id', Users.show);
    app.post('/users', Users.create)
    app.post('/sessions', Users.login);

    app.get('/surveys', Surveys.index)
    app.get('/surveys/:id', Surveys.show)
    app.post('/surveys', Surveys.create)
    app.put('/surveys/:id', Surveys.update)
    app.post('/surveys/:id', Surveys.delete);

}
