const Post = require('../models/PostModels');
const User = require('../models/UserModels');


const create_post = async(req , resp)=>{
    const user = await User.findOne({_id: req.params._id});

    const post = new Post(req.body);
    // post.Title = req.body.Title;
    // post.Text = req.body.Text;
    // post.Created_By = req.body.Created_By;
    // post.Likes = req.body.Likes;
    post.User = user._id;
    await post.save();

    user.Post.push(post._id);
    await user.save();
    resp.send(post);
    console.log(post);
    // let data = new post(req.body);
    // let ans = await data.save();
    // resp.send("Post created!!!");
}

const get_post = async(req , resp)=>{
    let data=await Post.find();
    resp.send(data);
}

const delete_post =  async(req , resp)=>{
    try{
        let post = await Post.findOne({_id : req.params._id});
        let user = await User.findOne({_id : post.User});
        let arr = user.Post;
        let i=0;
        while(arr[i] != req.params){
            i++;
        }
        user.Post.splice(i,1);
        await user.save(); 
        post = await Post.findOneAndDelete(req.params);
        resp.send(user);
        resp.send("Post deleted!!!");
    }
    catch(err){
        resp.send(err);
    }
}

const update_post = async(req , resp)=>{
    try{
        let data = await Post.findOneAndUpdate(
        req.params,
         {
             $set:post.req.body
         }
        );
         resp.send("Post Updated!!!!");
    } 
    catch(err){
        resp.send("Post not found");
    }  
}

 const likes_post = async(req , resp)=>{
    try{
        const post = await Post.findOne({_id : req.params._id});
        post.Likes ++;
        await post.save();
        resp.send(post);
    }catch(err){
        resp.send("Post not found");
    }
}

module.exports = {
    create_post,
    get_post,
    delete_post,
    update_post,
    likes_post
}