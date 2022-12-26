const express = require('express');
const {CreatePost , GetPost, DeletePost, UpdatePost, LikesPost} = require('../Controllers/PostControllers');
const auth = require("../Middewares/auth");
const {ProfileData ,PostData} = require("../Middewares/multer");

const PostRoutes = express();

// for posting a data---
PostRoutes.post('/', auth , PostData.array("PostFile",4) , CreatePost)
PostRoutes.get('/', auth , GetPost)
// deleting a post----
PostRoutes.delete('/:_id', auth , DeletePost)
// Updating a post-----
PostRoutes.put('/:_id', auth , UpdatePost)
//Liking a post--------
PostRoutes.put('/likes/:_id', auth , LikesPost)

module.exports = {
    PostRoutes
};