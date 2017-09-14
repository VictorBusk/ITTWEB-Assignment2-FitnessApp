const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workout = mongoose.model('Workout');

const getByUserId = function(req, res) {
    User.findById(req.params.userId)
        .populate('workouts')
        .exec((err, user) => {
            res.status(200)
                .json(user.workouts);
        });
};

const create = function(req, res) {
    Workout.create({
        name: req.body.name,
        description: req.body.description
    }, (err, workout) => {
        User.findByIdAndUpdate(
            req.params.userId,
            {$push: {workouts: workout}},
            {new: true},
            function(err, user) {
                res.redirect('/user/' + req.params.userId + '/workouts');
            }
        );
    });
};

const remove = function (req, res) {
    User.findByIdAndUpdate(
        req.params.userId,
        {$pull: {workouts: req.params.id}},
        {new: true},
        (err, user) => {
            res.redirect('/user/' + req.params.userId + '/workouts');
        }
    );
};

module.exports = {
    getByUserId,
    create,
    remove
};
