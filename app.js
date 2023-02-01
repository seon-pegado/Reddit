require('dotenv').config();
const express = require('express');
require('./mongodb.js');
const {UserRoutes} = require('./Routes/UserRoutes');
const {PostRoutes} = require('./Routes/PostRoutes');
const {CommentRoutes} = require('./Routes/CommentsRoutes');
require('./socket.io/server')
const app = express();
app.use(express.json());

// User 
app.use('/user',UserRoutes);

// Post
app.use('/post',PostRoutes);

//Comment
app.use('/comment',CommentRoutes);

app.listen(5000 , ()=>{
    console.log('The server is running at port 5000');
});
