var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all articles page. */
router.get('/articlelist', function(req, res) {
    var db = req.db;
    var collection = db.get('articles');
    collection.find({},{},function(e,docs){
        res.render('articlelist', {
            "articlelist" : docs
        });
    });
});

module.exports = router;
