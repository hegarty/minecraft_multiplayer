var React = require('react');
var postal = require('postal');

var First_name = React.createClass(
{
	componentDidMount:function()
	{
		var v = "Terence";
		$("#first_name").val(v);
		this.props.model.first_name = v;
	},
	input: function(e)
	{
		e.preventDefault();
		var _self = this;
	
		var error = function(target,m)
        {
            _self.props.model.email = "";
        	$(target).addClass("error");
            $(target).next('div.error_message').css('display','inline-block').text(m);
		};

		var validate = new RegExp("^([a-zA-Z]+)$");

        if(validate.test(this.refs.first_name.value))
        {
			this.props.model.first_name = this.refs.first_name.value;
			$(e.target).removeClass("error");
            $(e.target).next('div.error_message').css('display','none');
		}
		else
		{
			this.props.model.first_name = "";
			error(e.target,'Alpha characters only');
		}
		console.log("Model:"+ JSON.stringify(this.props.model));
	},
	render: function ()
	{
		return (
		<div className ="form_element first_name">
			<label>First Name</label>
			<input id="first_name" placeholder="First name" ref="first_name" onChange={this.input} />
			<div className="error_message"></div>
		</div>
		);
	}
});

var Last_name = React.createClass(
{
	componentDidMount:function()
	{
		var v = "Hegarty";
		$("#last_name").val(v);
		this.props.model.last_name = v;
	},
	input: function(e)
	{
		e.preventDefault();
		var _self = this;
	
		var error = function(target,m)
        {
            _self.props.model.last_name = "";
        	$(target).addClass("error");
            $(target).next('div.error_message').css('display','inline-block').text(m);
		};

		var validate = new RegExp("^([a-zA-Z]+)$");

        if(validate.test(this.refs.last_name.value))
        {
			this.props.model.last_name = this.refs.last_name.value;
			$(e.target).removeClass("error");
            $(e.target).next('div.error_message').css('display','none');
		}
		else
		{
			this.props.model.last_name = "";
			error(e.target,'Alpha characters only');
		}
		console.log("Model:"+ JSON.stringify(this.props.model));
	},
	render: function ()
	{
		return (
		<div className ="form_element last_name">
			<label>Last Name</label>
			<input id="last_name" placeholder="Last name" ref="last_name" onChange={this.input} />
			<div className="error_message"></div>
		</div>
		);
	}
});

var Email = React.createClass(
{
	componentDidMount:function()
	{
		var v = "tsh@terencehegarty.com";
		$("#email").val(v);
		this.props.model.email = v;
	},
	unique: function(e)
	{
		$.ajax(
		{
				type: 'POST',
				url: '/api/users/email/unique',
				data: {"email":e}
		})
		.done(function(d)
		{
			postal.publish(
            {
                channel: "user",
                topic: "unique_email",
                data:d
            });
		})
		.fail(function(jqXhr)
		{
				console.log('failed to register');
		});
	},
	input: function(e) 
    {
    	e.preventDefault();
		var _self = this;	
		var error = function(target,m)
		{
			_self.props.model.email = "";
		    $(target).addClass("error");
            $(target).next('div.error_message').css('display','inline-block').text(m);
		};

		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
		if(re.test(this.refs.email.value))
        {
			this.unique(this.refs.email.value);

			postal.subscribe(
			{           
				channel: "user",
				topic: "unique_email", 
				callback: function(data, envelope) 
				{               
					if(data.status == 'taken')    
            		{           
                		error(e.target,'Email in use, choose another');
            		}
            		else
            		{
                		_self.props.model.email = _self.refs.email.value;
            		   	$(e.target).removeClass("error");
            			$(e.target).next('div.error_message').css('display','none');
					}	
				}               
			});         

		}
        else
        {
			error(e.target,'Not a valid email address');
        }
                
	console.log("Model:"+ JSON.stringify(this.props.model));

	},
   	render: function () 
	{
		return (
           	<div className ="form_element email">
        	<label>Email</label>
            <input placeholder="Email" id="email" ref="email" onChange={this.input} />
            <div className="error_message"></div>
		</div>
		);
	}
});

var Username = React.createClass(
{
        componentDidMount:function()
        {
        	var v = "dad";
           	$("#username").val(v);
            this.props.model.username = v;
        },
		unique: function(e)
		{
			$.ajax(
			{
					type: 'POST',
					url: '/api/users/username/unique',
					data: {"username":e}
			})
			.done(function(d)
			{
				postal.publish(
				{
					channel: "user",
					topic: "unique_username",
					data:d
				});
			})
			.fail(function(jqXhr)
			{
					console.log('failed to register');
			});
		},
        input: function(e)
        {
			e.preventDefault();
			var _self = this;	
			var error = function(target,m)
			{
				_self.props.model.username = "";
				$(target).addClass("error");
            	$(target).next('div.error_message').css('display','inline-block').text(m);
			};


			var validate = new RegExp("^([a-zA-Z0-9]+)$");

			if(validate.test(this.refs.username.value))
			{
				this.unique(this.refs.username.value);

				postal.subscribe(
				{           
					channel: "user",
					topic: "unique_username", 
					callback: function(data, envelope) 
					{   
						if(data.status == 'taken')    
						{           
							error(e.target,'Username in use, choose another');
						}
						else
						{
							_self.props.model.username = _self.refs.username.value;
							$(e.target).removeClass("error");
							$(e.target).next('div.error_message').css('display','none');
						}	
					}               
				});  
			}
			else
			{
				this.props.model.username = "";
				error(e.target,'Alphanumeric characters only');
			}
			console.log("Model:"+ JSON.stringify(this.props.model));
        },
        render: function ()
        {
			return (
			<div className ="form_element username">
				<label>Username</label>
				<input id="username" placeholder="Username" ref="username" onChange={this.input} />
				<div className="error_message"></div>
			</div>
			);
        }
});


var Password = React.createClass(
{
	componentDidMount:function()
	{
		var v = "sheba1810";
		$("#password").val(v);
		this.props.model.password = v;
	},
	input: function(e)
	{
		e.preventDefault();
		var _self = this;

		var error = function(target,m)
        {
            _self.props.model.password = "";
            $(target).addClass("error");
            $(target).next('div.error_message').css('display','inline-block').text(m);
        };

		var validate = new RegExp("^([a-zA-Z0-9]+)$");
		
		if(validate.test(this.refs.password.value))
		{
			this.props.model.password = this.refs.password.value;
			$(e.target).removeClass("error");
			$(e.target).next('div.error_message').css('display','none');
		}
		else
		{
			this.props.model.password = "";
			error(e.target,'Alphanumeric characters only');
		}
		
		console.log("Model:"+ JSON.stringify(this.props.model));
	},
	render: function ()
	{
		return (
		<div className ="form_element password">
			<label>Password</label>
			<input id="password" placeholder="Password" ref="password" onChange={this.input} />
			<div className="error_message"></div>
		</div>
		);
	}
});

var Start_server = React.createClass(
{
	componentDidMount:function()
	{
	},
	server_form: function(e)
	{
		e.preventDefault();
		console.log('but clicked');
	},
	render: function ()
	{
		return (
		<div className ="form_element">
			<input type="button" onClick={this.validate} />
		</div>
		);
	}
});

var Complete_highlighted_fields = React.createClass(
{
	render: function ()
    {
        return (
        <div className ="form_header">
        	- Complete highlighted fields -
		</div>
        );
    }

});

var signup_form = React.createClass(
{
	model:{},
	complete_highighted_field:function()
	{
		$('#sign_up_mount #signup_form .form_header').css('display','inline-block');	
	},
	validate:function(e)
	{
		for(var k in this.model)
		{
			if(this.model[k].length<=0)
			{
				this.complete_highighted_field();
				return true;
			}
		}
		this.submit();
	},
	auth:function(e)
    {
        var _self = this;
        $.ajax(
        {
                type: 'POST',
                url: '/login/validate',
                data: _self.model
        })
        .error(function(data)
        {
            console.log('ERROR Stat: '+data.status);
        })
        .done(function(data)
        {
            console.log('AUTH success: '+data);
            postal.publish(
            {
                channel: "auth",
                topic: "login",
                data:
                {
                    "data":data,
                }
            });
        })
        .fail(function(jqXhr)
        {
                console.log('failed to register');
        });

    },
	submit: function()
	{
		console.log('submit')
  		var _self = this

  		console.log("Data POST: "+this.model);

  		$.ajax(
		{
    			type: 'POST',
    			url: '/signup/new_user',
    			data: _self.model
  		})
  		.done(function(data) 
		{
			_self.auth(_self.model);
			console.log('success: '+JSON.stringify(self.model));

		})
  		.fail(function(jqXhr) 
		{
    			console.log('failed to register');
  		});

	},		
	render: function ()
	{
		return (
			<div id ="signup_form">
			<Complete_highlighted_fields />
			<First_name model={this.model} />
			<Last_name model={this.model} />
			<Email model={this.model} />
			<Username model={this.model} />
			<Password model={this.model} />
			<button type="button" className="btn" onClick={this.validate}>Submit</button>
			</div>
		);
	}
});

module.exports = signup_form;
