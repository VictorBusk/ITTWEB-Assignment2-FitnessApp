var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Workout = require('../models/workout');

var schema = new Schema({
    name: {type: String, required: true},
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
});
//
// schema.pre('remove', function(next) {
//     Workout.remove({user: this._id}).exec();
//     next();
// });

module.exports = mongoose.model('User', schema);