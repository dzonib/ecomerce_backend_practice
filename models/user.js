const Sequelize = require('sequelize')

const sequelize = require('../db/sequelize')

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true
	}
})



module.exports = User