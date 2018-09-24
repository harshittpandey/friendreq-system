var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/search', ensureAuthenticated, function(req, res){
	User.find({username: {$ne: req.user.username}}, function(err, result){
		if (err) throw err;
		res.render('search',{
			result: result
		});
	});
});

router.post('/search', ensureAuthenticated, function(req, res) {
	 var searchfriend = req.body.searchfriend;
	 var mssg= '';
		if (searchfriend = req.user.username) {
			searchfriend= null;
		}
		 User.find({username: searchfriend}, function(err, result) {
			 if (err) throw err;
				 res.render('search', {
				 result: result,
				 mssg : mssg
			 });
	 });
});

router.post('/', function(req, res) {
	var form =new formidable.IncomingForm();
	form.parse(req);
	form.on('fileBegin', function(name, file){
		file.path = __dirname  + '/../public/upload' + file.name;
	});
	form.on('file', function(name, file) {
		User.update({
			'userImage': file.name
		}, function(err, result){
			if(err) {
				console.log(err);
			}
		});
	});
	req.flash('success_msg', 'Your profile picture has been uploaded');
	res.redirect('/');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;