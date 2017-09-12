var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

router.get('/', function(req, res, next) {
    Exercise.find({}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        res.render('exercise', { title: 'Exercises', exercises: doc });
    });
});

router.post('/', function(req, res, next) {
    var exercise = new Exercise({
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps_time: req.body.reps_time
    });
    exercise.save();
    res.redirect('/');
});

module.exports = router;
