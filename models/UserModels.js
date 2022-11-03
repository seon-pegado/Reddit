const mongoose = require('mongoose');
const validator = require('validator');

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
    },
    Post : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
    }]
})

const User = mongoose.model("User",UserDetails);

module.exports = User; 