require('dotenv').config();
const User = require('../models/UserModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer  = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASS
    },
    port : 465
})

//Creating a user API----------------------------------
const CreateUser = async (req, resp) => {
    let data = new User(req.body);
    data.ProfilePic = req.file.buffer;
    await data.save();
    
    resp.status(200).json({ success: true , msg: "Data inserted!!!!"});

}

//Creating a login API------------------------------------
const LoginUser = async (req, resp) => {
    try {
        const user = await User.findOne({ Email: req.body.email });
        if (user) {
            const pass = await bcrypt.compare(req.body.password,user.Password);
            if (pass) {
                const token = await jwt.sign({Email : req.body.email} , process.env.KEY);
                mailTransporter.sendMail({
                    from: process.env.EMAIL,
                    to: user.Email,
                    subject: "Successful login for Reddit Clone",
                    Text: "Welcome"+user.UserName+"to Reddit Clone Website you have successfully logged in into your account.Hope you have a good time with us"
                })
                resp.status(200).send({success: true , msg:"Logged In", accessToken: token});
            }
            else {
                resp.status(200).send({ success: false, msg: "Incorrect login credentials" });
            }
        }
        else {
            resp.status(200).send({ success: false, msg: "Incorrect Login Credentials" });
        }
    } catch (err) {
        resp.status(400).send({ success: false, Error: err.message })
    }
}

//To Get the data of User API----------------------
const GetUser = async (req, resp) => {
    let data = await User.findOne({Email : req.user.Email}).select("-ProfilePic -Password");
    resp.status(200).send(data);
}

// To delete the data of User API----------------------
const DeleteUser = async (req, resp) => {
    try {
        let data = await User.findOne(req.params);
        if (data) {
            resp.status(200).send("The data of User was deleted!!!!");
        }
        else {
            resp.status(200).send("The Data of user was not found!!!")
        }
    }
    catch (err) {
        resp.status(400).send({success: false , Error: err.message});
    }
}

// To update the data of User API------------------------------------
const UpdateUser = async (req, resp) => {
    try {
        let data = await User.findOneAndUpdate(
            req.params,
            {
                $set: req.body
            }
        );
        if (data) {
            data.save();
            resp.status(200).send("Data Updated!!!!");
        }
        else {
            resp.status(200).send({success: false , msg: "The Data of user not found!!!"});
        }
    }
    catch (err) {
        resp.status(400).send({success: false , Error: err.message});
    }
}

module.exports = {
    CreateUser,
    LoginUser,
    GetUser,
    DeleteUser,
    UpdateUser
}