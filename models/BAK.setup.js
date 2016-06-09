var moment= require('moment');
var pg = require('pg');
var config = require('../config')[process.env.NODE_ENV].postgres;
var resource = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database;

module.exports =
{	
	publish:function(pub,st,mes)
	{
		var res = {};
		res.status = st;
		res.message = mes;
		pub.emit("provision_insert",res);
	},
	insert:function(pub,d)
	{
		self = this;
		pg.connect(resource, function(err, client, done)
		{
			if(err)
			{
				self.publish(pub,"connection error",err);
			}
			
			var date = moment().format();
			//console.log('DATA: '+JSON.stringify(d));	
			var p = client.query("INSERT INTO servers (hash,created,email,subdomain,motd,pvp,difficulty,level_name,seed) VALUES ('hash','"+date+"','"+d.email+"','"+d.subdomain+"','"+d.motd+"','"+d.pvp+"','"+d.difficulty+"','"+d.level_name+"','"+d.seed+"') RETURNING port", function(err, result)
			{
				if(err)
				{
					self.publish(pub,"server response error",err);
				}
				else
				{
					d.port = result.rows[0].port;
					self.publish(pub,"success",d);
				}	
			});
		});
	
		return false;
	}
}
