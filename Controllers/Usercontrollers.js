const User = require('../models/UserModels');
const bcrypt = require('bcryptjs');


const create_user =  async(req , resp) =>{
    req.body.Password = await bcrypt.hash(req.body.Password , 10);
    let  data=new User(req.body);
    await data.save();
    resp.send("Data inserted!!!!");
}

const get_user = async(req , resp)=>{
    let data=await User.find();
    resp.send(data);
}

const delete_user = async(req  , resp)=>{
    try{
        let data = await User.findOneAndDelete(req.params);
        resp.send("The data of User was deleted!!!!");
    }
    catch(err){
        resp.send("Data not found!!!");
    }
}
 
const update_user = async(req , resp)=>{
    try{
        let data=await User.findOneAndUpdate(
        req.params,
          {
              $set:req.body 
          }
        );
        resp.send("Data Updated!!!!");
    }
    catch(err){
        resp.send("Data not found");
    }
}

module.exports = {
    create_user,
    get_user,
    delete_user,
    update_user
}