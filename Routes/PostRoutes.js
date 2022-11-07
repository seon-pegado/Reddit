const express = require('express');
const {create_post,get_post,delete_post,update_post,likes_post} = require('../Controllers/PostControllers');
const auth = require("../Middewares/auth");

const Post_routes = express();

// for posting a data---
Post_routes.post('/:_id', create_post)
Post_routes.get('/', auth , get_post)
// deleting a post----
Post_routes.delete('/:_id', auth , delete_post)
// Updating a post-----
Post_routes.put('/:_id', update_post)
//Liking a post--------
Post_routes.put('/likes/:_id', likes_post)

module.exports = {
    Post_routes
};