const mongoose = require('mongoose');

const PostDetails = mongoose.Schema({
    Title : {
        type : String, 
        required : true
    },
    Text : {
        type : String, 
        required : true
    },
    Created_By : {
        type : String,
        required : true
    },
    Uploaded_On : {
        type : Date, 
        default : Date.now
    },
    Likes : {
        type : Number, 
        default : 0,
        required : true
    },
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true});

const Post = mongoose.model("Post",PostDetails);

module.exports = Post; 