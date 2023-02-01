require('dotenv').config();
const User = require('../models/UserModels')
const jwt = require('jsonwebtoken');
const io = require('socket.io')(3000 , {
    cors:{
        origin:["http://localhost:5000" ]
    }
});
require('./client')

io.use(async(socket , next)=>{
    const token = socket.handshake.headers.authorization;
    if(!token){
        next(new Error ("You are not Authorized"));
    }else{
        const detail = jwt.verify(token , process.env.KEY)
        const user = await User.findById({_id : detail._id})
        if(user){
            socket.UserName = user.UserName;
            console.log(socket.UserName);
            next();
        }
        else{
            next(new Error("You are not authorized"));
        }
       
    }
});
io.on('connection' , socket =>{
    console.log(socket.id);
    socket.on("sendMessage" , (message , room) =>{
        if(room === ''){
            socket.broadcast.emits("recieveMessage"  , message)
        }else{
            socket.to(room).emits("recieveMessage"  , message)
        }
    })
    socket.on('joinRoom' , room =>{
        socket.join(room)
        console.log(socket.Username+"joined room"+room);
    })
});



