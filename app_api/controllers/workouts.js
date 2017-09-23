const mongoose = require('mongoose');
const User = mongoose.model('User');
const Workout = mongoose.model('Workout');

const getByUserId = function(req, res) {
    User.findById(req.params.userId)
        .populate('workouts')
        .exec((err, user) => {
            if (!user) {
                res.status(404)
                    .json({"message": "workouts not found"});
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(user.workouts);
            }
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
            (err, user) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(workout);
                }
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
            if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(204)
                    .json(null);
            }
        }
    );
};

module.exports = {
    getByUserId,
    create,
    remove
};
