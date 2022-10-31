const express  = require('express');
const {create_user,get_user,delete_user,update_user} = require('../Controllers/UserControllers.js');

const User_routes = express.Router();

// for creating a user login----
User_routes.post('/', create_user)
User_routes.get('/', get_user)
// deleting data of  User----
User_routes.delete('/:_id', delete_user)
// updating an User's Data------
User_routes.put('/:_id', update_user)

module.exports = {
    User_routes
};