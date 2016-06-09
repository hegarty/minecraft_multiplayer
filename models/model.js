//var user_meta = require('./user.js'),
var servers_meta = require('./servers.js');    
var server_log_meta = require('./server_log.js');
var users_meta = require('./users.js');

connection = require('../sequelize.js')

var servers = connection.define('servers', servers_meta.attributes, servers_meta.options);
module.exports.servers = servers;

var server_log = connection.define('server_log', server_log_meta.attributes, server_log_meta.options);
module.exports.server_log = server_log;

var users = connection.define('users', users_meta.attributes, users_meta.options);
module.exports.users = users;
