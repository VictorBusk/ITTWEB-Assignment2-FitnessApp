var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    User.find({}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        res.render('users', { title: 'Users', users: doc });
    });
});

router.post('/', function(req, res, next) {

    if(req.body.user) {
        User.findOneAndUpdate({_id: req.body.user}, {name: req.body.name}, {new: true}, function (err, doc) {
            if (err) {
                return res.send('Error!');
            }
        });
    }
    else {
        var user = new User({
            name: req.body.name
        });
        user.save();
    }
    res.redirect('/users');
});

router.get('/edit/:id', function(req, res, next) {

    User.findById(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        User.find({_id:{'$ne':req.params.id} }, function (err, doc2) {
            if(err) {
                return res.send('Error!');
            }
            res.render('users', { title: 'Users', user: doc, users: doc2, userid: doc._id});
        });
    });
});

router.get('/delete/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, doc) {
        if(err) {
            return res.send('Error!');
        }
        res.redirect('/users');
    });
});

module.exports = router;
