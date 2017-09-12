var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
});

module.exports = mongoose.model('User', schema);