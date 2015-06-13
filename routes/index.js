var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/articlelist');
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

/* GET Specific Article page. */
router.get('/article/:name', function(req, res) {
	var db = req.db;
	var name = req.params.name;
    var collection = db.get('articles');
    collection.findOne({"name": name},{},function(e,docs){
    	console.log(docs);
        res.render('articledetails', {
            "article" : docs
        });
    });
});


/* GET New Article page. */
router.get('/articlenew', function(req, res) {
    res.render('articlenew', { title: 'Create New Article' });
});

/* POST to Add Article service */
router.post('/addarticle', function(req, res) {
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var name = req.body.name;
    var content = req.body.content;

    // Set our collection
    var collection = db.get('articles');

    // Submit to the DB
    collection.insert({
        "name" : name,
        "content" : content
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("articlelist");
        }
    });
});

module.exports = router;
