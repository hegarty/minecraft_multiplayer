var Sequelize = require('sequelize')

var attributes = 
{
	username: 
	{
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate:{ is: /^[a-z0-9\_\-]+$/i }
  	},
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
	email:
	{
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate:
		{
				isEmail: true
		}
	},
	password: 
	{
    		type: Sequelize.STRING,
  	},
	username:
    	{
        	type: Sequelize.STRING,
    	},
	salt:
    	{
        	type: Sequelize.STRING,
    	},
	first_name:
        {
                type: Sequelize.STRING,
                allowNull: false,
                validate:{ is: /^[a-z0-9\_\-]+$/i }
        },
        last_name:
        {
                type: Sequelize.STRING,
                allowNull: false,
                validate:{ is: /^[a-z0-9\_\-]+$/i }
        },
}

var options = 
{
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
