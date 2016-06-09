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
  	message: 
	{
    		type: Sequelize.TEXT,
  	},
}

var options = 
{
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options

