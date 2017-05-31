console.log('Users controller');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Survey = mongoose.model('Survey');
module.exports = {
  index: function(req,res){
    //   console.log("index");
    User.find({}).populate('survey').exec(function (err, users) {
        if(err){
            return res.json(err)
        }
        return res.json(users);
    })
  },
  create: function(req, res){
		var user = new User(req.body);
		User.create(req.body, function(err, user){
			if(err){
				return res.json(err);
			}
			return res.json(user);
		})
	},
  update: function(req,res){
    //your code here
    User.findById(req.params.id).exec(function(err, user){
        if(err){
            return res.json(err)
        }
        if(!user){
            return res.json({
                errors: 'user not found'
            });
        }
        user.name = req.body.name;
        user.save(function(err, user){
            if(err){
                return res.json(err)
            }
            return res.json(user)

        })
    })

  },
  delete: function(req,res){
    User.findByIdAndRemove(req.params.id).exec(function(err, user){
        if(err){
            return res.json(err)
        }
        return res.json(user)
    })
  },
  show: function(req,res){
    //your code here
    User.findById(req.params.id).exec(function(err, user){
        if(err){
            return res.json(err)
        }
        return res.json(user);
    })
  },
  login: function(req, res) {
      User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.json(err)
        }
        if(user && user.authenticate(req.body.password)){
            return res.json(user)
            }
            return res.json({
                "errors":{
                    "password":{
                        "message": "Invalid credientials."
                }
            }
        })

    })
  }
}
