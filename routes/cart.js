const express = require('express')

const isAuth = require('../middleware/isAuth')
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')

const router = express.Router()

router.post('/add', isAuth, async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ where: { userId: req.user.id } })

		// const product = await Product.findByPk(1)

		// const cartItem = await cart.addProduct(product)

		const [product] = await cart.getProducts({ where: { id: req.body.productId } })

		console.log(JSON.stringify(product, null, 4))

		// let oldQuantity;

		if (product) {
			console.log('ADSADSDASDASDASDASDASDS')
			const newQuantity = product.cartItem.quantity + 1

			const addedProduct = await cart.addProduct(product, { through: { quantity: newQuantity } })
			console.log(JSON.stringify(addedProduct, null, 4))

			return res.json(addedProduct)
		}
		const productToAdd = await Product.findByPk(req.body.productId)
		const addedProduct = await cart.addProduct(productToAdd)

		// const products = await cart.getProducts({ where: { id: req.body.productId } })
		console.log(JSON.stringify(addedProduct, null, 4))

		// const cartAndProduct = await cart.addProduct(product, { through: { quantity: 5 } })
		res.json(addedProduct)
	} catch (e) {
		res.json(e)
	}
})

router.post('/order', isAuth, async (req, res, next) => {
	try {
		const cart = await Cart.findOne({where: {userId: req.user.id}})

		// const products = await cart.getProducts()

		const user = await User.findByPk(req.user.id)

		const newOrder = await user.createOrder()
		
		const orderProducts = await cart.getProducts()

		const something = await newOrder.addProducts(orderProducts.map(product => {
			product.orderItem = { quantity: product.cartItem.quantity }
			return product
		}))

		await cart.setProducts(null)

		console.log(JSON.stringify(something, null, 4))

		res.json(something)
	} catch (e) {
		console.log(e.message)
	}
})

module.exports = router
