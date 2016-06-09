var React = require('react');
var postal = require('postal');

var Username = React.createClass(
{
        componentDidMount:function()
        {
                var v = "dad";
                $("#username").val(v);
                this.props.model.username = v;
		},
        help:function()
        {
                return "The \"level-name\" value will be used as the world name and its folder name. The default value is \"world\".";
        },
        input: function(e)
        {
                e.preventDefault();
                var validate = /^([a-zA-Z0-9]+)$/;
                if(this.refs.username.value.match(validate))
                {
                        this.props.model.username = this.refs.username.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.username = "";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));
        },
        render: function ()
        {
                return (
                <div className ="form_element">
                        <label>Userame</label>
                        <input id="username" placeholder="Username" ref="username" onChange={this.input} />
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
        help:function()
        {
                return "The \"level-name\" value will be used as the world name and its folder name. The default value is \"world\".";
        },
        input: function(e)
        {
                e.preventDefault();
                var validate = /^([a-zA-Z0-9]+)$/;
                if(this.refs.password.value.match(validate))
                {
                        this.props.model.password = this.refs.password.value;
                        $(e.target).css('border-color','green');
                }
                else
                {
                        this.props.model.password = "";
                        $(e.target).css('border-color','red');
                }
                console.log("Model:"+ JSON.stringify(this.props.model));
        },
        render: function ()
        {
                return (
                <div className ="form_element">
                        <label>Password</label>
                        <input id="password" placeholder="Password" ref="password" onChange={this.input} />
                </div>
                );
        }
});

var auth_form = React.createClass(
{
	model:{},
	submit: function(e)
	{
  		e.preventDefault()
  		var _self = this

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
			window.location.href = "/profile/"+data.user_hash;
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
        render: function ()
        {
                return (
                <div id ="signup_form">
			<Username model={this.model} />
			<Password model={this.model} />
			<button type="button" className="btn" onClick={this.submit}>Submit</button>
		</div>
                );
        }
});

module.exports = auth_form;
