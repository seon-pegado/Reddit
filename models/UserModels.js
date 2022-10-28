const mongoose = require('mongoose');

const UserDetails = mongoose.Schema({
    UserName : {
        type : String, 
        // minlength : 2,
        required : true
    },
    Email : {
        type : String,
        unique : true, 
        required : true
    },
    Password : {
        type : String, 
        // minlength : 8,
        required : true
    },
    Mobile_no : {
        type : Number,
        // maxlength : 10, 
        required : true
    },
    DOB : {
        type : String,
        // maxlength : 10, 
        required : true
    },
    BIO : {
        type : String,
        required : true
    },
    Post : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    }]
})

const User = mongoose.model("User",UserDetails);

module.exports = User; 