var model = require('../models/model');
var provision = require('./provision');

var setup_controller =
{
	
	config:function(req,res)
	{
		var event_emitter = require("events").EventEmitter;

		var server_sub = new event_emitter().on('server_setup',function(e)
		{
			console.log('LOAD  event emit');
			res.render('setup_response.ejs',
			{
					'title':'Set up a Minecraft Server',
					'body_class':'setup',
					'output':'yup success'
			});
		});
		
		var data = req.body;
		
		var r = model.servers.create(
		{
			"hash":Math.random().toString(36).substring(4,12).replace(/\s+/g, '-').toLowerCase(),
			"email":data.email,
			"subdomain":data.subdomain,
			"motd":data.motd,
			"pvp":data.pvp,
			"difficulty":data.difficulty,
			"level_name":data.level_name,
			"seed":data.seed_id,
			"status":"pending",
			"user_hash":data.user_hash,
		}).then(function(data)
		{
			//console.log("data.dataValues.hash: "+JSON.stringify(data.dataValues));
			//var server = provision.init(server_sub,data.dataValues);
		
			console.log('LOAD  event emit');
			res.render('setup_response.ejs',
			{
					title:'Set up a Minecraft Server',
					'body_class':'setup',
					output:'yup success'
			});
		});
		
		//setup_controller.props(props_sub,data);
	},
	form:function(req, res) 
	{
		var data = req.params;

		var react = require('react');
		var dom = require('react-dom/server');
		var form = react.createFactory(require('../views/components/form'));
		var form_html = dom.renderToString(form({"user_hash":"terence"}));
		res.render('setup.ejs', 
		{
			title:'Set up a Minecraft Server',
			body_class:'setup',
			react_output: form_html,
			"user_hash":data.user_hash,
		});
	}
};

module.exports = setup_controller;
