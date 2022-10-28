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
        type : String, 
        required : true
    },
    Likes : {
        type : Number, 
        required : true
    },
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

const Post = mongoose.model("Post",PostDetails);

module.exports = Post; 