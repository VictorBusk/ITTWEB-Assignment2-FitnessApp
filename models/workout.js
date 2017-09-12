var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Exercise = require('../models/exercise');

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

module.exports = mongoose.model('Workout', schema);