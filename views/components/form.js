var React = require('react');

var Title = React.createClass(
{
    //59 chars max
    help:"This is the message that is displayed in the server list of the client, below the name.",
    componentDidMount:function()
        {
        var v = "Hello World!";
                this.props.model.motd = v
                $("#motd").val(v);
        },
        input: function(e)
        {
            e.preventDefault();
        this.props.model.motd = this.refs.motd.value;
        $(e.target).css('border-color','green');
                console.log("Model:"+ JSON.stringify(this.props.model));
    },
        render: function ()
        {
                return (
                <div className="form_wrapper">
                    <div className ="form_element">
                        <label>Message of the day (MOTD)</label>
                        <span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
                        <input id="motd" placeholder="" ref="motd" onChange={this.input} />
                    </div>
                    <p>
                        This is the message that is displayed in the server list of the client, below the name.
                    </p>
                </div>
                );
        }
});

var Email = React.createClass(
{
	help:"The email address connects you to your server. You are the administrator.",
	componentDidMount:function()
        {
		var v = "tsh@terencehegarty.com";
		$("#email").val(v);
		this.props.model.email = v;
	},	
        input: function(e) 
        {
        	e.preventDefault();
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(this.refs.email.value))
                {
                        this.props.model.email = this.refs.email.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.email = " ";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));

	},
        render: function () 
        {
		return (
                <div className ="form_element" >
                        <label>Email</label><span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
                        <input placeholder="" id="email" ref="email" onChange={this.input} />
                </div>
		);
	}
});

var SubDomain = React.createClass(
{
	help:"Use the subdomain to connect to your server",
	componentDidMount:function()
        {
		var v = Math.random().toString(36).substring(7);
		this.props.model.subdomain = v; 
                $("#subdomain").val(v);
        },
        input: function(e)
        {
        	e.preventDefault();
                var validate = /^([a-zA-Z-]+)$/;
                if(this.refs.subdomain.value.match(validate))
                {
                        this.props.model.subdomain = this.refs.subdomain.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.subdomain = "";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));
	},
        render: function ()
        {
                return (
                <div className ="form_element none">
                        <label>Sub-Domain</label>
			<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
                        <input type="hidden" id="subdomain" placeholder="" ref="subdomain" onChange={this.input} />
                </div>
                );
        }
});

var MOTD = React.createClass(
{
	//59 chars max
	help:"This is the message that is displayed in the server list of the client, below the name.",
	componentDidMount:function()
        {
		var v = "Hello World!";
                this.props.model.motd = v
                $("#motd").val(v);
        },
        input: function(e)
        {
        	e.preventDefault();
		this.props.model.motd = this.refs.motd.value;
		$(e.target).css('border-color','green');
                console.log("Model:"+ JSON.stringify(this.props.model));
	},
        render: function ()
        {
                return (
                <div className="form_wrapper">
					<div className ="form_element">
						<label>Message of the day (MOTD)</label>
						<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
						<input id="motd" placeholder="" ref="motd" onChange={this.input} />
					</div>
					<p>
						This is the message that is displayed in the server list of the client, below the name.
					</p>
				</div>
				);
        }
});

var PVP = React.createClass(
{
	help:"Players shooting themselves with arrows will only receive damage if PvP is enabled. True - Players will be able to kill each other. False - Players cannot kill other players (also known as Player versus Environment (PvE)).",
	componentDidMount:function()
        {
		var v = false;
                this.props.model.pvp = v
        	$("#pvp").val(v);
        },
        input: function(e)
        {
			this.props.model.pvp = $('input[name="pvp"]:checked').val();
			console.log("Model:"+ JSON.stringify(this.props.model));
		},
        render: function()
        {
                return (
                <div className="form_wrapper">
					<div className ="form_element">
						<label>Player vs Player (PVP)</label>
						<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
						<span className="setup_radio">
							<input type="radio" name="pvp" value="true" onClick={this.input} /> True
						</span>
						<span className="setup_radio">
							<input type="radio" name="pvp" value="false" onClick={this.input} checked="checked" /> False
						</span>
					</div>
					<p>
                    Players shooting themselves with arrows will only receive damage if PvP is enabled. True - Players will be able to kill each other. False - Players cannot kill other players (also known as Player versus Environment (PvE)
					</p>
				</div>
                );
        }
});

var Difficulty = React.createClass(
{
	help:"Defines the difficulty (such as damage dealt by mobs and the way hunger and poison affects players) of the server.0 - Peaceful 1 - Easy 2 - Normal 3 - Hard",
	componentDidMount:function()
        {
		var v = "1";
                this.props.model.difficulty = v
                $("#difficulty").val(v);
        },
        input: function(e)
        {       
        	e.preventDefault();
                var validate = /^([0-9]+)$/;
                if(this.refs.difficulty.value.match(validate))
                {
                        this.props.model.difficulty = this.refs.difficulty.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.difficulty = "";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));

	},      
        render: function()
        {       
                return (
                <div className="form_wrapper">
					<div className ="form_element">
						<label>Difficulty</label>
						<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
						<select className="setup_select" id="difficulty" ref="difficulty" onChange={this.input}>
							<option value="0">Peaceful</option>
							<option value="1">Easy</option>
							<option value="2">Normal</option>
							<option value="3">Hard</option>
						</select>
					</div>
					<p>
					Defines the difficulty (such as damage dealt by mobs and the way hunger and poison affects players) of the server.0 - Peaceful 1 - Easy 2 - Normal 3 - Hard
					</p>
				</div>
                );
        }
});

var LevelName = React.createClass(
{
	help:'The "level-name" value will be used as the world name and its folder name. The default value is "world".',
	componentDidMount:function()
        {
		var v = "A good level name";
                this.props.model.level_name = v
                $("#level_name").val(v);
        },
        input: function(e)
        {               
                e.preventDefault();
        	var validate = /^([a-zA-Z0-9-_ ]+)$/;
                if(this.refs.level_name.value.match(validate))
                {
                        this.props.model.level_name = this.refs.level_name.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.level_name = "";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));
	},
        render: function ()
        {               
                return (
                <div className="form_wrapper">
					<div className ="form_element">
                        <label>Level Name</label>
						<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
                        <input id="level_name" placeholder="" ref="level_name" onChange={this.input} />
                	</div>
					<p>
						The "level-name" value will be used as the world name and its folder name. The default value is "world".
					</p>
				</div>
                );
        }
});
   
var SeedID = React.createClass(
{
	help:"Add a seed for your world, as in Singleplayer.Some examples are: minecraft, 404, 1a2b3c.",
	componentDidMount:function()
        {
		var v = "123abc";
                this.props.model.seed_id = v
                $("#seed_id").val(v);
		},
	input: function(e) 
	{
		e.preventDefault();
		var validate = /^([a-zA-Z0-9-]+)$/;
        	if(this.refs.seed_id.value.match(validate))
		{ 
			this.props.model.seed_id = this.refs.seed_id.value;
    			$(e.target).css('border-color','green');
		}
		else
		{
			this.props.model.seed_id = "";
            $(e.target).css('border-color','red');
		}
		console.log("Model:"+ JSON.stringify(this.props.model));
	},     
	render: function ()
        {
            return (
			<div className="form_wrapper">
            	<div className ="form_element">
   					<label>Seed ID</label>
					<span title={this.help} className="help glyphicon glyphicon-question-sign"></span>
            		<input placeholder="" ref="seed_id" id="seed_id" onChange={this.input}/>
            	</div>
				<p className="last">
					Add a seed for your world, as in Singleplayer.Some examples are: minecraft, 404, 1a2b3c.
				</p>
			</div>
            );
        }
})

var User_hash = React.createClass(
{
	getInitialState: function() {
    return {value: this.props.user_hash};
  	},
	componentDidMount:function()
	{
		this.props.model.user_hash = this.state.value;//this.state.user_hash;
		console.log('STATE: '+JSON.stringify(this.props.model));
		//var v = "123abc";
		//this.props.model.user_hash = v;
		//$("#user_hash").val(v);
	},
	render:function()
	{
		return(
			<div className ="form_element">
			<input type="text" ref="user_hash" id="user_hash" />
			</div>
		);
	}
});


var Form = React.createClass(
{
	componentDidMount:function()
	{
		this.model.user_hash = mode.user_hash;
	},
	model:{},
	submit: function(e)
	{
  		e.preventDefault()
		var self = this;

  		$.ajax(
		{
    			type: 'POST',
    			url: '/setup/config',
    			data: self.model
  		})
  		.complete(function(data) 
		{
			//var socket = io('http://th.mc.com');
			//socket.emit('terence', { my: 'yo' });
			/*
			socket.on('news', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
			});
			*/
			window.location = "/server/"+self.model.subdomain;
		});

	},		
        render: function ()
        {
			return (
			<div id ="setup_form">
			<SubDomain model={this.model} />
			<MOTD model={this.model} />
			<PVP model={this.model} />
			<Difficulty model={this.model} />
			<LevelName model={this.model} />
			<SeedID model={this.model} />
			<button type="button" className="btn" onClick={this.submit}>Submit</button>
			</div>
        	);
        }
});

/*
var Search = React.createClass({
  getInitialState() {
    return {
      search: ""
    };
  },
  render() {
    return (
      <div className="search-component">
        <input type="text" onChange={this.changeSearch} />
        <span>You are searching for: {this.state.search}</span>
      </div>
    );
  },
  changeSearch(event) {
    var text = event.target.value;

    this.setState({
      search: text
    });
  }
});
*/

module.exports = Form;
