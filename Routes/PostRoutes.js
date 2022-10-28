const express = require('express');
const PostController = require('../Controllers/PostControllers');

const Post_routes = express();

// for posting a data---
Post_routes.post('/:_id', PostController.create_post)
Post_routes.get('/', PostController.get_post)
// deleting a post----
Post_routes.delete('/:_id', PostController.delete_post)
// Updating a post-----
Post_routes.put('/:_id', PostController.update_post)
//Liking a post--------
Post_routes.put('/likes/:_id', PostController.likes_post)

module.exports = {
    Post_routes
};