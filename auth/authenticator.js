const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

module.exports = (req,res,next)=>{
    const token = req.headers.authorization;
    jwt.verify(token,process.env.JWT_SECRET||"red", (err,decoded)=>{
        if(err){
            console.log(err);
            return res.status(401).json({err:"You shall not pass!"})
        }
        next();
    })

}
