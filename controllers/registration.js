var model = require('../models/model');
var bcrypt = require('bcrypt');

var registration_controller =
{
	new_user:function(req,res)
	{

		var data = req.body;
		var salt = bcrypt.genSaltSync(10);	
		console.log('DATA SPIT: '+JSON.stringify(data));

		var r = model.users.create(
		{
			"hash":Math.random().toString(36).substring(4,12).replace(/\s+/g, '-').toLowerCase(),
			"email":data.email,
			"password": bcrypt.hashSync(data.password, salt),
			"username":data.username,
			"salt": salt,
			"first_name":data.first_name,
			"last_name":data.last_name,
		}).then(function(data)
		{
			res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({"status":"success" }));
		});

	},
	registration_form:function(req, res) 
	{
		var react = require('react');
		var dom = require('react-dom/server');
		var form = react.createFactory(require('../views/components/registration_form'));
		var form_html = dom.renderToString(form({}));
		res.render('signup.ejs', 
		{
			title:'MincraftMode | Sign Up',
			signup_form: form_html,
			"body_class":'signup',
		});
	}
};

module.exports = registration_controller;
