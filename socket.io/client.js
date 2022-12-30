const io = require('socket.io-client');
const socket = io("http://localhost:3000");

socket.on('connect' , (message , room) =>{
    displayMessage('Your are connected with Id:'+socket.id);
    socket.emits("sendMessage" , (message , room))
    socket.on("recieveMessage" , message =>{
        displayMessage(message);
    })
    socket.emits('joinRoom' , (room , message) =>{
        displayMessage(message)
    })
})



