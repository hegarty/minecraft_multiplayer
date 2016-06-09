var React = require('react');
var dom = require('react-dom');
var postal = require('postal');
var nav = require('./public/j/components/navigation.js');
/*
if(document.getElementById('nav_mount'))
{
        var auth_links = React.createFactory(require('./views/components/auth_links'));
        var nav_mount = document.getElementById('nav_mount');
        dom.render(auth_links({}), nav_mount);
}
*/

if(document.getElementById('servers_by_user_mount'))
{
    var servers_by_user = React.createFactory(require('./views/components/servers_by_user'));
    var mount = document.getElementById('servers_by_user_mount');
    dom.render(new servers_by_user({"meta":window.meta}), mount);
}

if(document.getElementById('profile_mount'))
{
    var profile = React.createFactory(require('./views/components/profile'));
    var mount = document.getElementById('profile_mount');
    dom.render(new profile({"meta":window.profile_data}), mount);
}

if(document.getElementById('server_status_mount'))
{
	var server = React.createFactory(require('./views/components/server'));
   	var mount = document.getElementById('server_status_mount');
	dom.render(new server({"history":window.server_history}), mount);
}


if(document.getElementById('setup_mount'))
{
	var form = React.createFactory(require('./views/components/form'));
	var mount = document.getElementById('setup_mount');
	dom.render(new form({}), mount);
}

if(document.getElementById('auth_mount'))
{
        var auth = React.createFactory(require('./views/components/auth_form'));
        var auth_mount = document.getElementById('auth_mount');
        dom.render(auth({}), auth_mount);
}


if(document.getElementById('sign_up_mount'))
{
	var sign_up = React.createFactory(require('./views/components/registration_form'));
	var sign_up_mount = document.getElementById('sign_up_mount');
	dom.render(sign_up({}), sign_up_mount);
}
