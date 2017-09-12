var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

router.get('/:id', function(req, res, next) {
    Exercise.find({workout: req.params.id}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        Workout.findOne({_id: req.params.id}, function (err, doc2) {
            if (err) {
                return res.send('Error!');
            }
        res.render('exercises', { title: 'Exercises', exercises: doc, workoutid: req.params.id, userid: doc2.user });
        });
    });
});

router.post('/', function(req, res, next) {

    if(req.body.exercise) {
        Exercise.findOneAndUpdate({_id: req.body.exercise}, {name: req.body.name, description: req.body.description, sets: req.body.sets, reps_time: req.body.reps_time, workout: req.body.workout}, {new: true}, function (err, doc) {
            if (err) {
                return res.send('Error!');
            }
        });
    }
    else {
        var exercise = new Exercise({
            name: req.body.name,
            description: req.body.description,
            sets: req.body.sets,
            reps_time: req.body.reps_time,
            workout: req.body.workout
        });
        exercise.save();
    }
    res.redirect('/exercises/' + req.body.workout);
});

router.get('/edit/:id', function(req, res, next) {

    Exercise.findById(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        Exercise.find({workout: doc.workout, _id:{'$ne':req.params.id} }, function (err, doc2) {
            if(err) {
                return res.send('Error!');
            }
            res.render('exercises', { title: 'Exercises', exercise: doc, exercises: doc2, workoutid: doc.workout, exerciseid: doc._id });
        });
    });
});

router.get('/delete/:id', function(req, res, next) {

    Exercise.findByIdAndRemove(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        res.redirect('/exercises/' + doc.workout);
    });
});

module.exports = router;
