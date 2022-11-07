const express  = require('express');
const {create_user,login_user,get_user,delete_user,update_user} = require('../Controllers/UserControllers.js');
const auth = require('../Middewares/auth');

const User_routes = express.Router();

// for creating a user login----
User_routes.post('/', create_user)
//login user---------
User_routes.post('/login',login_user)
// Get the data of user ------------------
User_routes.get('/',auth,get_user)
// deleting data of  User------------
User_routes.delete('/:_id',auth,delete_user)
// updating an User's Data--------------
User_routes.put('/:_id',auth,update_user)

module.exports = {
    User_routes
};