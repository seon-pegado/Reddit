const Post = require('../models/PostModels');
const User = require('../models/UserModels');

// Creating a post------------
const create_post = async (req, resp) => {
    const user = await User.findOne({Email : req.user.Email});
    const post = new Post(req.body);
    post.User = user._id;
    await post.save();
    await user.save();
    resp.status(200).send({success: true, msg: post});
}

// To get Posts-----------------------------
const get_post = async (req, resp) => {
    let post = await Post.find();
    resp.status(200).send({success: true, msg: post});
}

// To delete a post----------------------------------
const delete_post = async (req, resp) => {
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
const update_post = async (req, resp) => {
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
const likes_post = async (req, resp) => {
    try {
        const post = await Post.findOne({ _id: req.params._id });
        await post.save();
        if (post) {
            post.Likes++;
            resp.status(200).send({success: true, msg: "Likes Updated!!!"});
        } else {
            resp.status(200).send({success: false, msg: "Post not found!!!"})
        }
    } catch (err) {
        resp.status(400).send({success: false, msg: err.msg});
    }
}

module.exports = {
    create_post,
    get_post,
    delete_post,
    update_post,
    likes_post
}