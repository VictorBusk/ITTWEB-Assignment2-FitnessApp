var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

module.exports = mongoose.model('Workout', schema);