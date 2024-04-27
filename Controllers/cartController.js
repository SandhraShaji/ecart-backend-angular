const carts = require('../Models/cartSchema')

exports.addToCart = async(req,res)=>{
    const {id,title,price,image,quantity} = req.body
    try{
        const cartItem = await carts.findOne({id})
        if(cartItem){
            cartItem.quantity+=1
            cartItem.price=cartItem.quantity*cartItem.price
            res.status(200).json("Product details updated")
        }
        else{
            const newProduct = new carts({id,title,price,image,quantity})
            await newProduct.save()
            res.status(200).json("Product details added")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.getCart = async(req,res)=>{
    try{
        const cartProduct = await carts.find()
        res.status(200).json(cartProduct)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.deleteCart=async(req,res)=>{
    const {id} = req.params
    try{
        const deleteCartProduct = await carts.deleteOne({id})
        if(deleteCartProduct){
            const allProducts = await carts.find()
            res.status(200).json(allProducts)
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.incrementCart=async(req,res)=>{
    const {id} = req.params
    try{
        const incrementCartProduct = await carts.findOne({id})
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal = incrementCartProduct.price*incrementCartProduct.quantity
            await incrementCartProduct.save()
            const cartProduct = await carts.find()
            res.status(200).json(cartProduct)
        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.decrementCart=async(req,res)=>{
    const {id} = req.params
    try{
        const decrementCartProduct = await carts.findOne({id})
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity==0){
                const deleteCartProduct = await carts.deleteOne({id})
                if(deleteCartProduct){
                    const allProducts = await carts.find()
                    res.status(200).json(allProducts)
                }
            }
            else{
                decrementCartProduct.grandTotal = decrementCartProduct.price*decrementCartProduct.quantity
                await decrementCartProduct.save()
                const cartProduct = await carts.find()
                res.status(200).json(cartProduct)
            }
        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}