const user = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    const{username,email,password} = req.body
    try{
        const existingUser = await user.findOne({email})
        if(existingUser){
            res.status(404).json("User already registered")
        }
        else{
            const newUser = new user({username,email,password})
            newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.login = async(req,res)=>{
    const{email,password} = req.body
    try{
        const existingUser = await user.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id}, process.env.JWTKey)
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json("Invalid email or password")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}