console.log('Surveys controller');
var mongoose = require('mongoose');

var Survey = mongoose.model('Survey');
var User = mongoose.model('User');

module.exports = {
    index: function(req,res){
      Survey.find({}).exec(function (err, surveys) {
          if(err){
              return res.json(err)
          }
          return res.json(surveys);
      })
    },
    create: function(req, res){
        console.log(req.body);
  		Survey.create(req.body, function(err, survey){
  			if(err){
  				return res.json(err);
  			}
  			User.findById(req.body.user, function(err, user){
                if(err){
                    return res.json(err)
                }
                user.surveys.push(survey._id)
                user.save(function(err, user){
                    if(err){
                        return res.json(err)
                    }
                    return res.json(survey)
                })
            })
  		})
  	},
    show: function(req,res){
      //your code here
      Survey.findById(req.params.id).exec(function(err, survey){
          if(err){
              return res.json(err)
          }
          return res.json(survey);
      })
  },
  delete: function(req, res){
      Survey.findByIdAndRemove(req.params.id).exec(function(err, survey){
         if(err){
             return res.json(err)
         }
         return res.json(survey)
     })
  },
  update: function(req, res){
      console.log(req.body.option);
      Survey.findById(req.params.id,function(err, survey){
          if(err){
              return res.json(err);
          }
          survey[req.body.option].vote++;
          survey.save(function(err, survey){
              if(err){
                  return res.json(err)
              }
              console.log(survey);
              return res.json(survey);
          })
      })
    //   Survey.findByIdAndUpdate(req.params.id, {}).exec(function(err, survey){
    //       if(err){
    //           return res.json(err)
    //       }
    //       return res.json(survey)
    //   })
  }
}
