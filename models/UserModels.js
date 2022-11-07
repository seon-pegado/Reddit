const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserDetails = mongoose.Schema({
    UserName : {
        type : String, 
        minlength : 2,
        unique : true,
        required : true
    },
    Email : {
        type : String,
        unique : true, 
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid");
            }
        }
    },
    Password : {
        type : String, 
        minlength : 8,
        required : true,
    },
    Mobile_no : {
        type : String,
        maxlength : 10,
        minlength : 10,
        required : true
    },
    DOB : {
        type : String,
        required : true
    },
    BIO : {
        type : String,
    }
})

UserDetails.pre('save', async function(next){
    try {
        this.Password = await bcrypt.hash(this.Password, 10);

    } catch (error) {
        next(error);
    }
})


const User = mongoose.model("User",UserDetails);

module.exports = User; 