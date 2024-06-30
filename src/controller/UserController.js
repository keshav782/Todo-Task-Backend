const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
// const secretKey = 'yourSecretKey';

exports.register = async(req,res)=>{
    try{
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).json({message:"All fields are required"});
        }
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword});
        const newUser = await user.save();
        res.status(201).json({newUser});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.login = async(req,res)=>{

    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({user,token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}


