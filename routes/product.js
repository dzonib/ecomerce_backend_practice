const express = require('express')

const isAuth = require('../middleware/isAuth')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

const router = express.Router()

// add product
router.post('/add', isAuth, async (req, res, next) => {
	try {
		const { title, description, price } = req.body

		const user = await User.findByPk(req.user.id)
		const product = await user.createProduct({ title, description, price })
		res.json(product)
	} catch (e) {
        console.log(e.message)
        res.status(401)
	}
})

// get all products
router.get('/', async (req, res, next) => {
    const products = await Product.findAll({})

    res.json(products)
})

module.exports = router
