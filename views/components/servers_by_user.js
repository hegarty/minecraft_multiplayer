var React = require('react');
var moment = require('moment');

var Server_status = React.createClass(
{
    get_servers: function(meta) 
    {
		if(meta)
		{
			var li = Object.keys(meta).map((k,v)=>
			{
				return (
				<li key={v} className="server_row">
					<span className="server_name"><a href={"/instance/"+meta[k].subdomain}>{meta[k].level_name}</a></span>
					<span className="date_created">{moment(meta[k].createdAt).fromNow()}</span>
					<span className="number_online">3/10</span>
					<span className="server_status">{meta[k].status}</span>
				</li>
				);
			})

			this.setState({
				"server_list":li
			});
		}
	},
	componentDidMount:function()
	{
		var servers = this.get_servers(window.servers_by_user);	
	},
	componentWillMount:function()
    {
		var meta = (typeof window == 'object')?window.servers_by_user:this.props.meta;
		var servers = this.get_servers(meta);
    },
	render: function()
	{
		return (
			<ul>{this.state.server_list}</ul>
		)
    }
});

var List_of_servers = React.createClass(
{
    render: function ()
   	{
        return (
        <div>
            <Server_status meta={this.props.meta}/>
        </div>
        );
   	}
});

module.exports = List_of_servers;
