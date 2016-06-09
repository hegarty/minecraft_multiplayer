var passport = require('passport');

var is_authenticated = function (req, res, next)
{
    if(req.isAuthenticated())
    {
        console.log('TRUE: '+req.isAuthenticated());
        res.is_auth = true;
		return next();
    }
    else
    {
        console.log('FLAS: '+req.isAuthenticated());
        res.is_auth = false;
		return next();
        //res.redirect('/');
    }
}

var index_model = require('./models/index');
var index_controller = require('./controllers/index');

var setup_controller = require('./controllers/setup');

var proxy_model = require('./models/proxy');
var proxy_controller = require('./controllers/proxy');

//var registration = require('./models/registration');
var registration_controller = require('./controllers/registration');
var auth_controller = require('./controllers/auth');
var server_controller = require('./controllers/server');
var profile_controller = require('./controllers/profile');
var api_users_controller = require('./controllers/api_users');

module.exports = function(app)
{
	app.post('/api/users/email/unique', api_users_controller.unique_email);	
	app.post('/api/users/username/unique', api_users_controller.unique_username);


	app.get('/', index_controller.home);
	app.get('/instance/:subdomain', server_controller.server_instance);
	app.get('/servers/:user_hash', is_authenticated, server_controller.servers_by_user);

    app.get('/setup/:user_hash', is_authenticated, setup_controller.form);
	app.post('/setup/config', setup_controller.config);

	app.get('/signup', registration_controller.registration_form);
	app.post('/signup/new_user', registration_controller.new_user);

	app.get('/profile/:user_hash', is_authenticated, profile_controller.index);

	app.get('/logout', auth_controller.logout);
	app.get('/login', auth_controller.auth_form);
	app.post('/login/validate',function(req, res, next) 
	{
		var b = req.body;
		passport.authenticate('local_strategy', function (err, user, info) 
		{
			if(err)
			{
				console.log('Log in ERR: '+err);
			}
			else if(info)
			{
				console.log('unauthorized 401: '+info);
			}
			else
			{
				req.login(user, function(err) 
				{
					if(err)
					{
						console.log('ERRRRR: '+err);
					}
					else
					{
						
						var user_data =
						{
							"id":user.id,
							"hash":user.hash,
							"username":user.username,
						}
						req.session.cookie.maxAge = 604800000; // Cookie expires after 30 days

						res.cookie('mmode_username',user.username, { path: '/', httpOnly: false, maxAge: 604800000 }); // 7 days
						res.cookie('mmode_user_hash',user.hash, { path: '/', httpOnly: false, maxAge: 604800000 }); // 7 days
						res.username = user.username;
						res.status(200);
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify(
						{
							'username':req.user.username, 
							'user_hash': req.user.hash 
						}));
					}
				});
			}
		})(req, res, next);
	});
	
	app.get('/proxy', proxy_controller.whatever);
}
