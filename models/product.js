const Sequelize = require('sequelize')

const sequelize = require('../db/sequelize')


const Product = sequelize.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})


module.exports = Product
