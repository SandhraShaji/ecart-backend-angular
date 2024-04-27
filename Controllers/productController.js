const products = require('../Models/productSchema')

//get all products
exports.getAllProducts = async(req,res)=>{
    try{
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.viewProduct = async(req,res)=>{
    const {id} = req.params
    try{
        const viewAProduct = await products.findOne({id})
        res.status(200).json(viewAProduct)
    }
    catch(err){
        res.status(404).json(err)
    }
}