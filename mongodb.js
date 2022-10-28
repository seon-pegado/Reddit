const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
};
mongoose.connect(
    'mongodb+srv://Seon:Seonunicode@cluster0.ib1y5gn.mongodb.net/Reddit?retryWrites=true&w=majority',
    async(err)=>{
        if(err) throw err;
        console.log("Connected");
    }
 )