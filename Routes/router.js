const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')
const jwtmiddleware = require('../Middlewares/jwtMiddleware')
const router = new express.Router()

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/all-products', productController.getAllProducts)
router.get('/view-product/:id', productController.viewProduct)
router.post('/add-wishlist',jwtmiddleware,wishlistController.addToWishlist)
router.get('/get-wishlist',jwtmiddleware,wishlistController.getWishlist)
router.delete('/product/delete-wishlist/:id', jwtmiddleware, wishlistController.deleteWishlist)
router.post('/product/add-cart', jwtmiddleware, cartController.addToCart)
router.get('/get-cart',jwtmiddleware, cartController.getCart)
router.delete('/product/delete-cart/:id', jwtmiddleware, cartController.deleteCart)
router.get('/increment-cart/:id', jwtmiddleware, cartController.incrementCart)
router.get('/decrement-cart/:id', jwtmiddleware, cartController.decrementCart)

module.exports = router