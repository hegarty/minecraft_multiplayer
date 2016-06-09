var model = require('../models/model');
var provision = require('./provision');

var api_users_controller =
{
	unique_email:function(req,res)
	{
		var d = req.body;

		model.users.findOne(
		{
        	where:{"email":d.email},
            raw: true,
			//logging:console.log 
		}).then(function(r)
		{
			var email_status = (r === null && typeof r === "object")?"available":"taken";
			res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({"status":email_status }));
		});
	},
	unique_username:function(req,res)
    {
        var d = req.body;

        model.users.findOne(
        {
        	where:{"username":d.username},
            raw: true,
            //logging:console.log 
       	}).then(function(r)
        {
            var username_status = (r === null && typeof r === "object")?"available":"taken";
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({"status":username_status }));
        });
    },
};

module.exports = api_users_controller;
