const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'randomValue';

const verifyToken = async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY || secretKey);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
        
    }
}

module.exports = verifyToken;