const express = require('express');
const {postComment , getComment , deleteComment} = require('../Controllers/CommentControllers');
const auth = require('../Middewares/auth');

const CommentRoutes = express();
CommentRoutes.get('/:_id' , auth , getComment);

CommentRoutes.post('/:_id' , auth , postComment);

CommentRoutes.delete('/:_id' , auth , deleteComment);


module.exports = {CommentRoutes};