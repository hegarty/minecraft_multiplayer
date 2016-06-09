var model = require('../models/model');
var provision = require('./provision');
var moment = require('moment');

var server_controller =
{
	server_instance:function(req, res)
    {
        var data =
        {
            "server_name":"level_name",
            "ip":"123.123.13.12",
            "port":"12345",
            "jar":"PocketMine",
            "motd":"hello world",
            "pvp":false,
            "difficulty":1,
            "seed":"none",
            "created_on":"today",
            "status":"active"
        };

		var sub = req.params.subdomain;
        model.servers.findOne({
        where:{subdomain:sub},
        raw: true,
        //logging:console.log 
        }).then(function(server_meta)
        {
			console.log('server_meta.user_hash: '+JSON.stringify(server_meta));
            model.server_log.findAll(
            {
                where:{hash:server_meta.hash},
                raw:true,
            }).then(function(_history)
            {
                if(server_meta.status === 'pending')
                {
                    provision.init(server_meta);
                }

                var history = JSON.stringify(_history);
                var react = require('react');
                var dom = require('react-dom/server');
                
				var server = react.createFactory(require('../views/components/server'));
                var server_status = dom.renderToString(server({"history":JSON.parse(history)}));
                
				var component = react.createFactory(require('../views/components/server_config_details'));
        		var server_config_details_output = dom.renderToString(component({data}));
				
				res.render('server_instance.ejs',
                {
                    "title":'MincraftMode | Profile',
            		"is_auth":res.is_auth,
            		"server_config_details_component":server_config_details_output,
            		"body_class":'profile',
					"data":history,
                    "history":history,
                    "server_hash":server_meta.hash,
                    "server_status":server_status,
					 data
                });
            });
        });
    },
	servers_by_user:function(req,res)
	{
		var user_hash = req.params.user_hash;
		var react = require('react');
        var dom = require('react-dom/server');
	
		model.servers.findAll({
        where:{"user_hash":user_hash},
        raw: true,
        //logging:console.log 
        }).then(function(metadata)
        {
			var servers = react.createFactory(require('../views/components/servers_by_user'));
			var servers_by_user = dom.renderToString(servers({"meta":metadata}));
			
			res.render('servers_by_user.ejs', 
			{
				"title":'Servers_by_user',
				"body_class":'servers_by_user',
				"servers_by_user_component":servers_by_user,
				"servers_by_user":JSON.stringify(metadata)
			});
		});

	},
	index:function(req, res) 
	{
		var sub = req.params.subdomain;
		model.servers.findOne({
        where:{subdomain:sub},
		raw: true,
		//logging:console.log 
		}).then(function(server_meta)
		{
			model.server_log.findAll(
			{
				where:{hash:server_meta.hash},
				raw:true,
			}).then(function(_history)
			{
				if(server_meta.status === 'pending')
				{
					provision.init(server_meta);
				}

				var history = JSON.stringify(_history);
				var react = require('react');
				var dom = require('react-dom/server');
				var server = react.createFactory(require('../views/components/server'));
				var server_status = dom.renderToString(server({"history":JSON.parse(history)}));
				res.render('server.ejs', 
				{
					"title":'Set up a Minecraft Server',
					"body_class":'right-sidebar',
					"data":history,
					"history":history,
					"server_hash":server_meta.hash,
					"server_status":server_status
				});
			});
		});
		
	}
};

module.exports = server_controller;
