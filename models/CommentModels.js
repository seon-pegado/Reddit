const mongoose = require('mongoose');

const CommentDetails = mongoose.Schema({
    PostId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        unique : true
    },
    UserIds : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'        
    }],
    Comments : [{
        type : String,
        required : true
    }]
})

const Comment = mongoose.model('Comment' , CommentDetails);

module.exports = Comment;