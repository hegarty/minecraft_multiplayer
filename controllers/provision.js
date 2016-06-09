var moment= require('moment');
var model = require('../models/model');

module.exports =  
{
	init:function(properties)
	{
		//console.log('PUB; '+pub);
		console.log('PROPS: '+JSON.stringify(properties));

		this.props = properties;
		this.name = this.props.subdomain;
		this.mkdir();
		this.hash = this.props.hash	
		io.emit(this.props.hash,'***** Configuring Minecraft PE Server *****');
	},
	publish:function(st,mes)
        {
                var res = {};
                res.status = st;
                res.message = mes;
                this.pub.emit("server_setup",res);
        },
	mkdir:function()
	{
		var dir = '/servers/'+this.name;
		var parent = this;
		exec('mkdir '+dir, function (error, stdout, stderr)
		{
			if(error === 0)
			{
				parent.copy(dir);
			}
			else
			{
				console.log('MKDIR error:'+error+' - stderr:'+stderr);
			}
		});
	},
	copy:function(dir)
	{	
		var parent = this;
		exec('cp -R /mcpe/* '+dir+'/',function (error,stdout,stderr)
		{
			if(error === 0)
			{
				parent.delete_orig_props(dir);
			}
			else
			{
				console.log('CP error:'+error+' - stderr:'+stderr);
			}
		});
	},
	delete_orig_props:function(dir)
	{
		var parent = this;
		exec('rm -f '+dir+'/server.properties',function (error,stdout,stderr)
		{
			if(error === 0)
			{
				parent.properties(dir);
			}
			else
			{
				console.log('CP error:'+error+' - stderr:'+stderr);
			}
		});
	},
	properties:function(dir)
	{
		console.log("+this.props.motd: "+this.props.motd);

		var parent = this;
		var props = "#Minecraft Mode - Properties Config file\n";
		props += "#"+moment().format('dddd, MMMM Do YYYY, h:mm:ss a')+" \n";
		props += "motd= "+this.props.motd+" \n";
		props += "server-port="+this.props.port+"\n";
		props += "memory-limit=-1 \n";
		props += "white-list=off \n";
		props += "announce-player-achievements=on \n";
		props += "spawn-protection=16 \n";
		props += "max-players=20 \n";
		props += "allow-flight=off \n";
		props += "spawn-animals=on \n";
		props += "spawn-mobs=on \n";
		props += "gamemode=0 \n";
		props += "force-gamemode=off \n";
		props += "hardcore=off \n";
		props += "pvp="+this.props.pvp+" \n";
		props += "difficulty="+this.props.difficulty+" \n";
		props += "generator-settings= \n";
		props += "level-name="+this.props.level_name+" \n";
		props += "level-seed= "+this.props.seed_id+"\n";
		props += "level-type=DEFAULT \n";
		props += "enable-query=on \n";
		props += "enable-rcon=off \n";
		props += "rcon.password=efsutuSdic \n";
		props += "auto-save=on \n";
	
		var fs = require('fs');
		fs.writeFile(dir+"/server.properties",props, function(err) 
		{
			if(err) 
			{
				return console.log(err);
			}
			else
			{
				parent.start(dir);
			}
		}); 
	},
	start:function(dir)
	{
		console.log('top start');
		var parent = this;
		var spawn = require('child_process').spawn;
		var child = spawn(dir+'/start.sh');

		setTimeout(function()
		{ 
			var spa = require('child_process').exec;
			console.log('running KILLLLLLLL Port: '+parent.props.port);
			var kill = spa('kill $(lsof -t -i:'+parent.props.port+')');
		}, 6000);

		child.stdout.on('data',function(d)
		{
			//console.log('START: '+d);
			var h = parent.hash;
                        io.emit(h,d.toString());

			var r = model.server_log.create(
			{
				hash:parent.hash,
				message:d.toString(),
			});

			if(d.indexOf('server is running') > -1)
			{
				model.servers.update(
				{
					"status":"started",
				},
				{
					where:{"hash": parent.hash}
				});
			}
		});
	}
};
