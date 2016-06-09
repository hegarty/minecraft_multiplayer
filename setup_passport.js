var model = require('./models/model');
var passport = require('passport');
var local_strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var postal = require('postal');
var remember_me = require('passport-remember-me').Strategy;

var is_authenticated = function (req, res, next)
{
    if(req.isAuthenticated())
    {
        console.log('Authenticated: '+req.isAuthenticated());
		return next();
    }
    else
    {
        console.log('Authenticated: '+req.isAuthenticated());
        return next();
        //res.redirect('/');
    }
}

module.exports = function(app) 
{
	app.use(passport.initialize());
  	app.use(passport.session());

  	passport.use('local_strategy', new local_strategy(
    function(username, password, done) 
	{
		model.users.findOne(
		{
        	where: 
			{
          		'username': username
        	}
      	}).then(function (user) 
		{
        	if (user == null) 
			{
          		return done(null, false, { message: 'Incorrect credentials.' })
        	}
        
        	var hashedPassword = bcrypt.hashSync(password, user.salt)
        
        	if (user.password === hashedPassword) 
			{
          		return done(null, user);
        	}
        
        	return done(null, false, { message: 'Incorrect credentials.' })
      	})
    }))

	passport.serializeUser(function(user, done) 
	{
		//console.log('user: '+JSON.stringify(user));
		var user_data = 
		{
			"id":user.id,
			"hash":user.hash,
			"username":user.username,
		}
		done(null, user_data)
  	})

  	passport.deserializeUser(function(user, done) 
	{
		postal.publish(
        {
            channel: "auth",
            topic: "login",
            data:
            {
                "data":user,
            }
        });	

		done(null,user);		
		/*
		model.users.findOne(
		{
			where: 
			{
				'hash': user.hash
			}
		}).then(function (user) 
		{
			console.log('query results: '+JSON.stringify(user));
			if (user == null) 
			{
				done(new Error('Wrong user id.'))
			}

			done(null, user)
		})
		*/
		
  	})
}
