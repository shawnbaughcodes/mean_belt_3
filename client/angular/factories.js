/**************************************
        ANGULAR USER FACTORY
**************************************/
app.factory('UserFactory', function($http, $cookies){
    console.log('User Factory');
    var factory = {}
    factory.index = function(callback){
        $http.get('/users').then(callback)
    }
    factory.create = function(newUser, callback){
		$http.post('/users', newUser).then(callback);
	}

    factory.login = function(loginUser, callback){
        $http.post('/sessions', loginUser).then(callback);
    }

    factory.session = function(callback){
		var user_id = $cookies.get('user_id');
		if(!user_id){
			return callback(false);
		}
		$http.get('/users/' + user_id).then(function(res){
			if(res.data.errors){
				return callback(false)
			}
			return callback(res.data);
		})
	}
    factory.show = function(id, callback){
        $http.get('/users/' + id).then(callback)
    }

    return factory
})

/**************************************
        ANGULAR SURVEYS FACTORY
**************************************/
app.factory('SurveyFactory', function($http, $cookies){
    console.log('Survey Factory');
    var factory = {}

    factory.index = function(callback){
        $http.get('/surveys').then(callback)
    }
    factory.create = function(newSurvey, callback){
        $http.post('/surveys', newSurvey).then(callback)
    }
    factory.show = function(id, callback){
        console.log('route id: ' + id);
        $http.get('/surveys/' + id).then(callback)
    }
    factory.update = function(id, option, callback){
        $http.put('/surveys/' + id, {"option": option}).then(callback)
    }
    factory.delete = function(survey, callback){
        $http.post('/surveys/'+ survey).then(callback)
        // console.log(customer);
    }

    return factory
})
