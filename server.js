const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./db/sequelize')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const User = require('./models/user')
const Cart = require('./models/cart')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')
const Order = require('./models/order')
const OrderItem = require('./models/orderItem')

const app = express()

app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

User.hasOne(Cart)
User.hasMany(Product)
Product.belongsToMany(Cart, { through: CartItem })
Cart.belongsToMany(Product, { through: CartItem })
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem }) 

sequelize.sync().then(() => app.listen(3000, () => console.log('App running on 3000')))
