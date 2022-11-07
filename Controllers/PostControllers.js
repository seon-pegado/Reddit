const e = require('express');
const Post = require('../models/PostModels');
const { findOneAndDelete } = require('../models/UserModels');
const User = require('../models/UserModels');

// Creating a post------------
const create_post = async (req, resp) => {
    const user = await User.findOne({ _id : req.params._id});

    const post = new Post(req.body);
    post.User = user._id;
    await post.save();
    await user.save();
    resp.status(200).send({success: true, msg: post});
}

// To get Posts-----------------------------
const get_post = async (req, resp) => {
    const user = await User.findOne({Email : req.body.email});
    let post = await Post.find({User : user._id});
    resp.status(200).send({success: true, msg: post});
}

// To delete a post----------------------------------
const delete_post = async (req, resp) => {
    try {
        let post = await Post.findOne(req.params);
        let postId = post.User;
        let user = await User.findOne({Email : req.body.email});
        let userId = user._id;
        console.log(postId + "    " + userId);
        if (postId === userId) {
            
            await findOneAndDelete(post);
            resp.status(200).send({success: true, msg:"Post deleted!!!"});
        } else {
            resp.status(200).send({success: false, msg: "Post not found!!!"});
        }
    }
    catch (err) {
        resp.status(400).send({ success: false, msg: e.msg });
    }
}

// To Update a post-----------------------------------
const update_post = async (req, resp) => {
    try {
        let data = await Post.findOneAndUpdate(
            req.params,
            {
                $set: post.req.body
            }
        );
        if(data){
            resp.status(200).send({success: true, msg: "Post Updated!!!!"});
        }else{
            resp.status(200).send({success: false, msg: "Post not Found"});   
        }
    }
    catch (err) {
        resp.status(400).send({success: true, msg: e.msg});
    }
}

// TO increment Likes on a particular post------------------------
const likes_post = async (req, resp) => {
    try {
        const post = await Post.findOne({ _id: req.params._id });
        post.Likes++;
        await post.save();
        if (post) {
            resp.status(200).send({success: true, msg: "Likes Updated!!!"});
        } else {
            resp.status(200).send({success: false, msg: "Post not found!!!"})
        }
    } catch (err) {
        resp.status(400).send({success: false, msg: e.msg});
    }
}

module.exports = {
    create_post,
    get_post,
    delete_post,
    update_post,
    likes_post
}