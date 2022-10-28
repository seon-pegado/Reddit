const express  = require('express');
const Usercontroller = require('../Controllers/UserControllers.js');

const User_routes = express.Router();

// for creating a user login----
User_routes.post('/', Usercontroller.create_user)
User_routes.get('/', Usercontroller.get_user)
// deleting data of  User----
User_routes.delete('/:_id', Usercontroller.delete_user)
// updating an User's Data------
User_routes.put('/:_id', Usercontroller.update_user)

module.exports = {
    User_routes
};