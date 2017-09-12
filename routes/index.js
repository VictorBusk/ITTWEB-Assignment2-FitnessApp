var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E17 - ITTWEB-01 Webudvikling - Gruppe 7 - Mandatory assignment 1' });
});

module.exports = router;
