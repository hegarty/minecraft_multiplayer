var config = require('./config')[process.env.NODE_ENV].postgres;
var resource = "postgres://"+config.username+":"+config.password+"@"+config.host+"/"+config.database;

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(resource,
	{
		logging:false
	});

module.exports = sequelize
