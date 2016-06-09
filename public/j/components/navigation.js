var React = require('react');
var dom = require('react-dom');
var postal = require('postal');

var Signup = React.createClass(
{
        componentDidMount:function()
        {
        },
        render: function ()
        {
                return (
                        <a href="/signup">Sign Up</a>
                );
        }
});

var Spacer = React.createClass(
{
        render: function ()
        {
                return (
                        <span>|</span>
                );
        }
});

var Login = React.createClass(
{
        componentDidMount:function()
        {
        },
        render: function ()
        {
                return (
                        <a href="/login">Log In</a>
                );
        }
});

var Logout = React.createClass(
{
        componentDidMount:function()
        {
        },
		delete_cookie:function()
        {
			console.log('delete cookie');
            document.cookie = "mmode_user_hash=; path=/; expires=Thu, 17 Jan 1970 00:00:00 UTC";
			document.cookie = "mmode_username=; path=/; expires=Thu, 17 Jan 1970 00:00:00 UTC";
		
			window.location.href = "/logout";
		},
        render: function ()
        {
                return (
                        <a href="#" onClick={this.delete_cookie}>Log Out</a>
                );
        }
});

var User = React.createClass(
{
        render: function ()
        {
                return (
                        <a href="/profile/c90eyph1">{this.props.username}</a>
                );
        }
});

var Menu = React.createClass(
{
		read_cookie:function(n) 
		{
    		var name = n + "=";
    		var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) 
			{
        		var c = ca[i];
        		while (c.charAt(0)==' ') c = c.substring(1,c.length);
        		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    		}
    		return null;
		},
		getInitialState: function() 
		{
        	return { 'auth_state': false };
    	},
		componentDidMount:function()
        {
			var username = this.read_cookie('mmode_username');
			var user_hash = this.read_cookie('mmode_user_hash');
			
			if(username && user_hash)
			{
				this.setState(
				{ 
					"auth_state": true,
					"username": username,
					"user_hash": user_hash,
				});
			}
			else
			{
				this.setState(
                {
                    "auth_state": false,
                    "username":false,
                    "user_hash":false,
                });

			}
			
		},
        render: function ()
        {
                return (
                <div>
                        {this.state.auth_state ? "":<Signup />}
						{this.state.auth_state ? "":<Spacer />}
						{this.state.auth_state ? <User username={this.state.username} /> : <Login /> }
						{this.state.auth_state ? <Spacer />:""}
						{this.state.auth_state ? <Logout />:""}
				
				</div>
                );
        }
});

dom.render(<Menu />, document.getElementById('nav_mount'));
