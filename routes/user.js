const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const isAuth = require('../middleware/isAuth')
const User = require('../models/user')
const Cart = require('../models/cart')

router.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body

	try {
		const user = await User.findOne({ where: { email } })

		if (user) {
			return res.status(401).json('User exists!!')
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		console.log(hashedPassword)
		const newUser = await User.create({ name, email, password: hashedPassword })

		newUser.createCart({})

		res.json(newUser)
	} catch (e) {
		console.log(e.message)
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ where: { email } })
		if (!user) {
			res.json('User already exists')
		}

		const passCheck = await bcrypt.compare(password, user.password)

		if (!passCheck) {
			res.json('Wrong password')
		}

		const payload = {
            id: user.id,
			name: user.name,
			email: user.email
		}

		const token = await jwt.sign(payload, 'supersecretlol', { expiresIn: '60h' })

		res.json(`Bearer ${token}`)
	} catch (e) {
		res.json(e)
	}
})


router.get('/protected', isAuth, async (req, res, next) => {

    const cart = await Cart.findOne({where: {userId: req.user.id}})
    res.json(cart)
})


module.exports = router
