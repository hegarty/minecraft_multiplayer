var React = require('react');

var Server_status = React.createClass(
{
	help:"The email address connects you to your server. You are the administrator.",
	getInitialState: function() 
	{
		return {
				history:""
		};
    },
	componentWillMount: function() 
	{
		var history = this.props.history;
		history.reverse();
		this.setState({
			"history":history
		});
	},
	socket_io:function()
	{
		console.log('set sio');
	
		setTimeout(function()
		{
			console.log('setTimeout: '+window.server_hash);
			var socket = io('http://th.mc.com');

			socket.on(window.server_hash, function (data) 
			{
				$('article').prepend("<br>"+data);
			});
		},2000);

		/*
		socket.on('terence', function (data) {
		console.log(data);
		$('article').append("<br>"+data);
		socket.emit('my other event', { my: 'data' });
		*/
	},
	componentDidMount:function()
    {
		console.log('DidMount');
		this.socket_io();
		$('#react-server-status').css('border','1px solid #000');
		
	},	
	render: function() 
	{
		var history = this.state.history;
		
		return (
			<ul>
			{history.map(function(name, index)
			{
			    return <li key={ index }>{name.message}</li>;
			})}
			</ul>
		)
    }
});

var Server = React.createClass(
{
        render: function ()
        {
        return (
		<div>
			<Server_status history={this.props.history}/>
		</div>
		);
        }
});

module.exports = Server;
