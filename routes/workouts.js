var express = require('express');
var router = express.Router();
var Workout = require('../models/workout');
var User = require('../models/user');


router.get('/:id', function(req, res, next) {
    Workout.find({user: req.params.id}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        res.render('workouts', { title: 'Workouts', workouts: doc, userid: req.params.id });
    });
});

router.post('/', function(req, res, next) {

    if(req.body.workout) {
        Workout.findOneAndUpdate({_id: req.body.workout}, {name: req.body.name, description: req.body.description, user: req.body.user}, {new: true}, function (err, doc) {
            if (err) {
                return res.send('Error!');
            }
        });
    }
    else {
        var workout = new Workout({
            name: req.body.name,
            description: req.body.description,
            user: req.body.user
        });
        workout.save();
    }
    res.redirect('/workouts/' + req.body.user);
});

router.get('/edit/:id', function(req, res, next) {
    Workout.findById(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        Workout.find({user: doc.user, _id:{'$ne':req.params.id} }, function (err, doc2) {
            if(err) {
                return res.send('Error!');
            }
            res.render('workouts', { title: 'Workouts', workout: doc, workouts: doc2, userid: doc.user, workoutid: doc._id });
        });
    });
});

router.get('/delete/:id', function(req, res, next) {
    Workout.findByIdAndRemove(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        res.redirect('/workouts/' + doc.user);
    });
});

module.exports = router;
