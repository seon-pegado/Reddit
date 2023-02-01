const Comment = require('../models/CommentModels');
const User = require('../models/UserModels');
const Post = require('../models/PostModels');

//Posting a comment 

const postComment = async (req , res)=>{
   try{
    const comment = await Comment.findOne({PostId : req.params});
    if(!comment){   //Checking whether the comment are already present
        comment = new Comment();
        comment.PostId = req.params;
        comment.UserId = push(req.user);
        comment.Comment = push(req.body);
        await comment.save();
    }
    else{
        comment.UserId = push(req.user);
        comment.comment = push(req.body);
        await comment.save();
    }
    res.status(200).send({success : true , msg : comment})

   }catch(err)
   {
     res.status(400).send({success : false , msg : err})
   }
}

//To get all the Comments

const getComment = async(req , res)=>{
    try{
        const comment  = await Comment.findOne({postId : req.params});
        for(var i=0 ; i<comment.UserId.length ; i++)
        {
            const userId = comment.UserId[i];
            const user = await User.findById({_id : userId});
            res.send(user.Username);
            res.send(comment.Comment[i]);
        }
        res.status(200);
    }catch(err)
    {
        res.status(400).send({success : false , msg : err});
    }
 
}
//Deleting a Comment 
const deleteComment = async(req , res)=>{
    try{
        const comment = await Comment.findOne({postId : req.params});
        const post = await Post.findById({_id : req.params});
        const user  = await User.findById({_id : post.User});
        if(comment.UserId.includes(user._id)){
            const i = comment.UserId.indexof(user._id);//extracting the index of the comment user has commented
            comment.UserId.splice(i,1);
            comment.Comment.splice(i,1);
            await comment.save();
            res.status(400).send({success : true , msg : "Your comment deleted succesfully"});
        }
        else{
            res.status(200).send({success : true , msg : "You have not Commented on this post"});
        }   

    }catch(err){
        res.status(400).send({success : false , msg : err});
    }
}

module.exports = {
    postComment,
    getComment,
    deleteComment
}