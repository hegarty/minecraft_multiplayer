var React = require('react');
var postal = require('postal');
/*
            "server_name":"level_name",
            "ip":"123.123.13.12",
            "port":"12345",
            "jar":"PocketMine",
            "motd":"hello world",
            "pvp":false,
            "difficulty":1,
            "seed":"none",
            "created_on":"today",
            "status":"active"
*/

var Header = React.createClass(
{
	render: function ()
	{
		return (
		<div className ="">
			<div className="">Profile user name</div>
		</div>
		);
	}
});

var Server_name = React.createClass(
{
    render: function ()
    {
        return (
        <div className ="form_element">
			<label>Server name:</label>
            <input id="server_name" ref="server_name" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Ip = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>IP:</label>
            <input id="ip" ref="ip" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Port = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Port:</label>
            <input id="port" ref="port" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Jar = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Jar:</label>
            <input id="jar" ref="jar" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Motd = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Message of the Day:</label>
            <input id="motd" ref="motd" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Pvp = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Player vs Player:</label>
            <input id="pvp" ref="pvp" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Difficulty = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Difficulty:</label>
            <input id="difficulty" ref="difficulty" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Seed = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Seed:</label>
            <input id="seed" ref="seed" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Created_on = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Created on:</label>
            <input id="created_on" ref="created_on" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});

var Status = React.createClass(
{
    render: function ()
    {
        return (
		<div className ="form_element">
            <label>Status:</label>
            <input id="status" ref="status" onChange={this.input} value={this.props.v}/>
            <div className="error_message"></div>
        </div>
        );
    }
});



/*
            "server_name":"level_name",
            "ip":"123.123.13.12",
            "port":"12345",
            "jar":"PocketMine",
            "motd":"hello world",
            "pvp":false,
            "difficulty":1,
            "seed":"none",
            "created_on":"today",
            "status":"active"
*/


var Server_config_details = React.createClass(
{
	componentWillMount:function()
	{
		console.log(this.props.data.server_name);
	},	
	render: function ()
	{
		return (
			<div id ="server_config_details">
			<Header />
			<Server_name v={this.props.data.server_name} />
			<Ip v={this.props.data.ip} />
			<Port v={this.props.data.port} />
			<Jar v={this.props.data.jar}/>
			<Motd v={this.props.data.motd} />
			<Pvp v={this.props.data.pvp} />
			<Difficulty v={this.props.data.difficulty} />
			<Seed v={this.props.data.seed} />
			<Created_on v={this.props.data.created_on} />
			<Status v={this.props.data.status} />
			</div>
		);
	}
});

module.exports = Server_config_details;
