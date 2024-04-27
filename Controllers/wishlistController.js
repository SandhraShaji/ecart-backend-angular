const user = require('../Models/userSchema')
const wishlists = require('../Models/wishlistSchema')

exports.addToWishlist = async(req,res)=>{
    const {id, title, price, image} = req.body
    const userId = req.payload
    try{
        const wishlistItem = await wishlists.findOne({id})
        if(wishlistItem){
            res.status(401).json("Product already exists")
        }
        else{
            const newProduct = new wishlists({
                id,title,price,image,userId
            })
            await newProduct.save()
            res.status(200).json("Product added successfully")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.getWishlist = async(req,res)=>{
    try{
        const wishlistProduct = await wishlists.find()
        res.status(200).json(wishlistProduct)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.deleteWishlist=async(req,res)=>{
    const {id} = req.params
    try{
        const deleteWishlistProduct = await wishlists.deleteOne({id})
        if(deleteWishlistProduct){
            const allProducts = await wishlists.find()
            res.status(200).json(allProducts)
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}