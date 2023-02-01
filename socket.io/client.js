const io = require('socket.io-client');
const socket = io("http://localhost:3000");

socket.on('connect' , (message , room) =>{
    console.log("Connected with ID:"+socket);
    socket.emits("sendMessage" , (message , room))
   
    socket.emits('joinRoom' , room)
})
socket.on("recieveMessage" , message =>{
    console.log(message);
    displayMessage(message);
})



