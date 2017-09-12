var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    User.find({}, function (err, doc) {
        if (err) {
            return res.send('Error!');
        }
        console.log(doc);
        res.render('user', { title: 'Users', users: doc });
    });
});

router.post('/', function(req, res, next) {
    var user = new User({
        name: req.body.name
    });
    user.save();
    res.redirect('/');
});

module.exports = router;
