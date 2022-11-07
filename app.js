require('dotenv').config();
const express = require('express');
require('./mongodb.js');
const UserRoutes = require('./Routes/UserRoutes');
const PostRoutes = require('./Routes/PostRoutes');

const app = express();
app.use(express.json());

// User 
app.use('/user',UserRoutes.User_routes);

// Post
app.use('/post',PostRoutes.Post_routes);

app.listen(5000 , ()=>{
    console.log('The server is running at port 5000');
});
