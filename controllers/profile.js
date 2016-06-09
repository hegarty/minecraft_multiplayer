var model = require('../models/model');

var ev = require('events');
var events = new ev.EventEmitter();
var react = require('react');
var dom = require('react-dom/server');

var profile_controller =
{
	index:function(req, res) 
	{
		var profile_data = [];
		var servers_by_user_data = false;
		var user_hash = req.params.user_hash;
		
		var profile_component;
		var servers_by_user_component;

		var render_profile = function()
		{
			if(servers_by_user_data && profile_data)
			{ 
				events.removeListener('profile_ready', render_profile);

				res.render('profile.ejs',
				{
					"title":'MincraftMode | Profile',
					"is_auth":res.is_auth,
					"profile_component":profile_component,
					"profile_data":JSON.stringify(profile_data),
					"body_class":'profile',
					"servers_by_user_component":servers_by_user_component,
					"servers_by_user":JSON.stringify(servers_by_user_data)
				});
			}
		}

		events.on('profile_ready', render_profile);

		model.users.findOne({
        where:{"hash":user_hash},
		attributes: ['username', 'first_name','last_name','createdAt'],
        raw: true,
        //logging:console.log 
        }).then(function(data)
        {
			profile_data = data;
			var component = react.createFactory(require('../views/components/profile'));
           	profile_component = dom.renderToString(component({"profile_data":profile_data}));
        });


        model.servers.findAll({
        where:{"user_hash":user_hash},
        raw: true,
        //logging:console.log 
        }).then(function(data)
        {
			servers_by_user_data = data;
            var component = react.createFactory(require('../views/components/servers_by_user'));
            servers_by_user_component = dom.renderToString(component({"meta":servers_by_user_data}));
            events.emit('profile_ready');
		});

	},
};

module.exports = profile_controller;
