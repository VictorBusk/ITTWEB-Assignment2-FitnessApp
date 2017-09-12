var express = require('express');
var router = express.Router();
var Workout = require('../models/workout');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    User.find({}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        res.render('workout', { title: 'Workout', users: doc });
    });
});

router.post('/', function(req, res, next) {
    User.findOne({name: req.body.user}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        var workout = new Workout({
            name: req.body.name,
            user: doc
        });
        workout.save();
        res.redirect('/');
    });
});

module.exports = router;
