const Post = require('../models/PostModels');
const User = require('../models/UserModels');

// Creating a post------------
const CreatePost = async (req, resp) => {
    const user = await User.findOne({Email : req.user.Email});
    const post = new Post(req.body);
    const file = req.files;
    console.log(file);
    for(var i=0 ; i < file.length ; i++)
    {
        post.PostFile[i] = file[i].buffer;
    }
    post.User = user._id;
    await post.save();
    resp.status(200).send({success: true, msg: post});
}

// To get Posts-----------------------------
const GetPost = async (req, resp) => {
    let post = await Post.find().select("-PostFile");
    resp.status(200).send({success: true, msg: post});
}

// To delete a post----------------------------------
const DeletePost = async (req, resp) => {
    try {
        let post = await Post.findOne({_id : req.params._id});
        // let postId = post.User.toString();
        let user = await User.findOne({Email : req.user.Email});
        // let userId = user._id.toString();
        // console.log(postId + "    " + userId);
        if (post.User.toString() === user._id.toString()) {
            await Post.findOneAndDelete({_id : post._id});
            resp.status(200).send({success: true, msg: "post deleted"});
        } else {
            resp.status(200).send({success: false, msg: "Post not found!!!"});
        }
    }
    catch (err) {
        console.log(err)
        resp.status(400).send({ success: false, msg: err });
    }
}

// To Update a post-----------------------------------
const UpdatePost = async (req, resp) => {
    try {
        let data = await Post.findOne({_id : req.params._id});
        let user  = await User.findOne({Email : req.user.email});
        const postId = data.User.toString();
        const userId = user._id.toString();
        if(postId === userId){
            const post = await Post.findOneAndUpdate(
                req.params,
                {
                    $set: post.req.body
                }
            )
            await post.save();
            resp.status(200).send({success: true, msg: "Post Updated!!!!"});
        }else{
            resp.status(200).send({success: false, msg: "Not authorized to update the post"});   
        }
    }
    catch (err) {
        resp.status(400).send({success: true, msg: err});
    }
}

// TO increment Likes on a particular post------------------------
const LikesPost = async (req, resp) => {
    try {
        const post = await Post.findById(req.params);
        if(post.LikedBy.includes(req.user._id)){//if the person has already liked the post
            const i = post.LikedBy.indexof(req.user._id);
            post.LikedBy.splice(i,1);
            post.Likes = post.LikedBy.length;
            await post.save();
            resp.status(400).send({success : true , msg : "You have removed the LIKE from the post of id : "+post._id});
        }   
        else{
            post.LikedBy.push(req.user._id);
            post.Likes = post.LikedBy.length;
            await post.save();
            resp.status(400).send({success : true , msg : "You have LIKED the post of id : "+post._id});
        }   
    } catch (err) {
        resp.status(400).send({success: false, msg: err.msg});
    }
}

module.exports = {
    CreatePost,
    GetPost,
    DeletePost,
    UpdatePost,
    LikesPost
}