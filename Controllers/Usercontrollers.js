require('dotenv').config();
const User = require('../models/UserModels');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');

//Creating a user API----------------------------------
const create_user = async (req, resp) => {
    let data = new User(req.body);
    await data.save();
    resp.status(200).json({ success: true , msg: "Data inserted!!!!"});
}

//Creating a login API------------------------------------
const login_user = async (req, resp) => {
    try {
        const user = await User.findOne({ Email: req.body.email });
        console.log(user);
        if (user) {
            const pass = await bcrypt.compare(req.body.password,user.Password);
            console.log(pass);
            if (pass) {
                const token = await jwt.sign({Email : req.body.email} , process.env.KEY)
                resp.status(200).send({success: true , msg:"Logged In", accessToken: token});
            }
            else {
                resp.status(200).send({ success: false, msg: "Incorrect login credentials" });
            }
        }
        else {
            resp.status(200).send({ success: false, msg: "Account With this Email doesnot exist" });
        }
    } catch (err) {
        console.log(err);
        resp.status(400).send({ success: false, msg: err })
    }
}

//To Get the data of User API----------------------
const get_user = async (req, resp) => {
    let data = await User.findOne({Email : req.user.Email});
    resp.status(200).send(data);
}

// To delete the data of User API----------------------
const delete_user = async (req, resp) => {
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
        resp.status(400).send({success: false , msg: e.msg});
    }
}

// To update the data of User API------------------------------------
const update_user = async (req, resp) => {
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
        resp.status(400).send({success: false , msg: e.msg});
    }
}

module.exports = {
    create_user,
    login_user,
    get_user,
    delete_user,
    update_user
}