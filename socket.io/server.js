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
    console.log(token);
    if(!token){
        next(new Error ("You are not Authorized"));
    }else{
        const detail = jwt.verify(token , process.env.KEY)
        console.log(detail)
        // const user = await User.findById({_id : detail._id})
        // const username = user.UserName;
    }
});
io.on('connection' , socket =>{
    console.log(socket.id);
    socket.on("sendMessage" , (message , room) =>{
        if(room === ''){
            socket.emits("recieveMessage"  , message)
        }else{
            socket.to(room).emits("recieveMessage"  , message)
        }
    })
    socket.on('joinRoom' , (room , cb)=>{
        socket.join(room)
        cb('Joined Room:'+room)
    })
});



