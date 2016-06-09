var Sequelize = require('sequelize');

var attributes = 
{
	hash: 
	{
		type: Sequelize.STRING,
	    	allowNull: false,
	    	unique: true,
	    	validate: 
		{
	      		is: /^[a-z0-9\_\-]+$/i,
	    	}
  	},
  	subdomain: 
	{
    		type: Sequelize.TEXT,
  	},
  	motd: 
	{
    		type: Sequelize.TEXT,
  	},
  	pvp: 
	{
    		type: Sequelize.BOOLEAN,
  	},
  	difficulty: 
	{
    		type:Sequelize.INTEGER
  	},
	level_name:
	{
		type:Sequelize.TEXT,
	},
	seed:
	{
		type:Sequelize.TEXT,
	},
	port:
	{
			type:Sequelize.INTEGER
	},
	status:
	{
			type:Sequelize.TEXT,
	},
	user_hash:
	{
			type:Sequelize.TEXT,
	},
}

var options = 
{
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options

