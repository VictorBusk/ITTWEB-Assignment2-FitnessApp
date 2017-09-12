var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    sets: {type: String, required: true},
    reps_time: {type: String, required: true}
});

module.exports = mongoose.model('Exercise', schema);