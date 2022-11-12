require('dotenv').config();
const jwt = require("jsonwebtoken");

const auth = async (req , res , next)=>{
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if(token == null) return res.status(400).send("You are not authorized!!!");
    jwt.verify(token , process.env.KEY,(err,user)=>{
        if(err) return res.status(400).send({success: false , msg: err});
        req.user = user;
        console.log(req.user);
        next();
    });
}
module.exports = auth;