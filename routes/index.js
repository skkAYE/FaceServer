var express = require('express');
var router = express.Router();


router.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
    res.render('home.ejs', {});
});

router.get('/streaming', function(req, res) {
    res.render('streaming.ejs', {});
});

router.get('/history', function(req, res) {
    res.render('history.ejs', {});
});

router.get('/repertory', function(req, res) {
    res.render('repertory.ejs', {});
});

router.get('/contact', function(req, res) {
    res.render('contact.ejs', {});
});
module.exports = router;
