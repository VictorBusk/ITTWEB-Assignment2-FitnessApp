const mongoose = require('mongoose');
const Workout = mongoose.model('Workout');
const Exercise = mongoose.model('Exercise');

const getByWorkoutId = function(req, res) {
    Workout.findById(req.params.workoutId)
        .populate('exercises')
        .exec((err, workout) => {
            res.status(200)
                .json(workout.exercises);
        });
};

const create = function(req, res) {
    Exercise.create({
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps_time: req.body.reps_time
    }, (err, exercise) => {
        Workout.findByIdAndUpdate(
            req.params.workoutId,
            {$push: {exercises: exercise}},
            {new: true},
            (err, workout) => {
                res.redirect('/user/' + req.params.userId + '/workout/' + req.params.workoutId + '/exercises');
            }
        );
    });
};

const remove = function (req, res) {
    Workout.findByIdAndUpdate(
        req.params.workoutId,
        {$pull: {exercises: req.params.id}},
        {new: true},
        (err, workout) => {
            res.redirect('/user/' + req.params.userId + '/workout/' + req.params.workoutId + '/exercises');
        }
    );
};

module.exports = {
    getByWorkoutId,
    create,
    remove
};
