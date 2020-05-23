const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router.js");
const authenticator = require("../auth/authenticator.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/api/users",authenticator, userRouter);
server.use("/api/auth", authRouter);

server.get("/",(req,res)=>{
    res.json({message:"api up",
        auth_endpoints:{
            login:"POST /api/auth/login",
            register:"POST /api/auth/register"
        },
        music_endpoints:{
            message:"under development",
        }
    });
})

module.exports = server;