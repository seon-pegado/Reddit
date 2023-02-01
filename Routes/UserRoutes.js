const express  = require('express');
const {CreateUser , LoginUser, GetUser, DeleteUser, UpdateUser} = require('../Controllers/UserControllers.js');
const auth = require('../Middewares/auth');
const {ProfileData , PostData } = require('../Middewares/multer.js');

const UserRoutes = express.Router();

// for creating a user login----
UserRoutes.post('/', ProfileData.single("ProfilePic") , CreateUser)
//login user---------
UserRoutes.post('/login', LoginUser)
// Get the data of user ------------------
UserRoutes.get('/',auth, GetUser)
// deleting data of  User------------
UserRoutes.delete('/:_id',auth, DeleteUser)
// updating an User's Data--------------
UserRoutes.put('/:_id' , UpdateUser)

module.exports = {
    UserRoutes
};