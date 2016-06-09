var model = require('../models/model');
var passport = require('passport');
var bcrypt = require('bcrypt');

var auth_controller =
{
	logout:function(req,res)
	{
		var u = req.user;
		console.log('req.user: '+JSON.stringify(u));
		//req.logout();
		//res.redirect('/');
	},
	auth_form:function(req, res) 
	{
		var react = require('react');
		var dom = require('react-dom/server');
		var form = react.createFactory(require('../views/components/auth_form'));
		var form_html = dom.renderToString(form({}));
		res.render('auth_form.ejs', 
		{
			title:'MincraftMode | Log In',
			auth_form: form_html,
			"body_class":'no-sidebar',
		});
	}
};

module.exports = auth_controller;
