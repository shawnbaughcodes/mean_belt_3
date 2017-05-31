console.log('Survey model');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var SurveySchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please enter a question'],
        minlength: [8, 'Please enter longer question']
    },
    option1: {
        option:{
            type: String,
            minlength: [3, 'Please enter longer answer'],
            required: [true, 'Please enter an option']
        },
        vote:{
            type: Number,
            default: 0
        }
    },
    option2: {
        option:{
            type: String,
            minlength: [3, 'Please enter longer answer'],
            required: [true, 'Please enter an option']
        },
        vote:{
            type: Number,
            default: 0
        }
    },
    option3: {
        option:{
            type: String,
            minlength: [3, 'Please enter longer answer'],
            required: [true, 'Please enter an option']
        },
        vote:{
            type: Number,
            default: 0
        }
    },
    option4: {
        option:{
            type: String,
            minlength: [3, 'Please enter longer answer'],
            required: [true, 'Please enter an option']
        },
        vote:{
            type: Number,
            default: 0
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

var Survey = mongoose.model('Survey', SurveySchema)
