const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Users = require("../users/users-model");

router.post("/login",(req,res)=>{
    const {username,password} = req.body;
    Users.findBy({username}).then(([user])=>{
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({msg:"Authorized", token});
        }else{
            res.status(401).json({message: 'You shall not pass!'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"err"});
    });
})

router.post("/register",(req,res)=>{
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials).then(user=>{
        res.status(201).json(user);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"err"});
    });
})

module.exports = router;


const secret = process.env.JWT_SECRET || "valar morghulis"

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn:"1h",
    }

    return jwt.sign(payload, secret, options);
}