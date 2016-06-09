var React = require('react');
var postal = require('postal');
var moment = require('moment');

var Header = React.createClass(
{
	get_profile_data:function(profile_data)
	{
		if(profile_data)
		{
			this.setState({
                "username":profile_data.username,
				"first_name":profile_data.first_name,
				"last_name":profile_data.last_name,
				"joined":moment(profile_data.createdAt).format('MMMM Do YYYY'),
            });
		}
	},
	componentWillMount:function()
    {
        var data = (typeof window == 'object')?window.profile_data:this.props.profile_data;
        this.get_profile_data(data);
    },
	render: function ()
	{
		return (
		<div className ="profile_container">
			<div className="profile_username">{this.state.username} <span className="joined">{"Joined: "+this.state.joined}</span> </div>
			<div className="profile_name">{this.state.first_name +" "+ this.state.last_name}</div>
		</div>
		);
	}
});

var Profile = React.createClass(
{
	render: function ()
	{
		return (
			<div id ="profile">
			<Header profile_data = {this.props.profile_data}/>
			</div>
		);
	}
});

module.exports = Profile;
