require('dotenv').config();
const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
};
mongoose.connect(process.env.URL, async(err)=>{
        if(err) throw err;
        console.log("Connected");
});