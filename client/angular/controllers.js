/**************************************
    ANGULAR USERS CONTROLLER
**************************************/
app.controller('UsersController', function(UserFactory, $cookies, $location, $routeParams){
    console.log('UsersController');

    var self = this

    self.registration_errors = []
    self.login_errors = []
    self.current_user;

    // LOGOUT SHIT
    self.logout = function(){
        $cookies.remove('user_id')
        $location.url('/')
    }

    // SESSION SHIT
    self.session = function(){
		UserFactory.session(function(user){
			console.log('user: ', user);
			if(user){
				self.current_user = user;
			} else {
				$location.url('/');
			}
		})
	}
    // SHOW
    self.show = function(){
        // console.log($routeParams.id);
        UserFactory.show($routeParams.id, function(res){
            self.user = res.data
            console.log(res.data);
        })
    }

    //LOG IN
    self.login = function(loginUser) {
        self.login_errors = []
        UserFactory.login(loginUser, function(res){
            console.log(loginUser);
            if(res.data.errors){
                for(key in res.data.errors){
                    var error = res.data.errors[key];
                    self.login_errors.push(error.message)
                    console.log(res.data);
                }
            } else {
                $cookies.put('user_id', res.data._id);
                $location.url('/dashboard')
            }
        })
    }
    // ALL USERS
    self.getUsers = function(){
        UserFactory.index(function(res){
            console.log(res);
            self.users = res.data;
        })
    }
    // CREATE
    self.create = function(newUser){
		self.registration_errors = [];
		console.log('newUser: ', newUser);
		UserFactory.create(newUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.registration_errors.push(error.message);
				}
			} else {
				//save the user into session
				var user_id = res.data._id;
				$cookies.put('user_id', user_id);
				$location.url('/dashboard')
				//redirect to the next part of our app
			}
		})
	}

})
/**************************************
    ANGULAR SURVEYS CONTROLLER
**************************************/
app.controller('SurveysController', function(UserFactory, SurveyFactory, $cookies, $location, $routeParams){
    console.log('UsersController');

    var self = this
    self.survey_errors = []
    self.newSurvey = {}


    // ALL SURVEYS
    self.index = function(){
        SurveyFactory.index(function(res){
            console.log(res);
            self.surveys = res.data;
        })
    }

    self.create = function(newSurvey){
        UserFactory.session(function(user){
            newSurvey.user = user._id
            console.log(newSurvey);
            SurveyFactory.create(newSurvey, function(res){
                if(res.data.errors){
    				for(key in res.data.errors){
    					var error = res.data.errors[key];
    					self.survey_errors.push(error.message);
    				}
    			} else {
                    // self.index();
                    var id = res.data._id
                    console.log(res.data._id);
                    $location.url('/poll/' + id)
                }
            })
        })
    }

    self.show = function(){
        // console.log('route id: ' + $routeParams.id);
        SurveyFactory.show($routeParams.id, function(res){
            self.survey = res.data
            console.log(res.data);
        })
    }
    self.update = function(option){
        console.log(option);
        SurveyFactory.update($routeParams.id, option, function(res){
            self.survey = res.data
            // console.log(res.data);
        })
    }
    self.delete = function(survey){
        SurveyFactory.delete(survey, function(res, err){
            if(err){
                return res.json(err)
            }
            self.index();
            $location.url('/dashboard')
        })
    }
})
