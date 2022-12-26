const multer = require('multer');

var ProfileData = multer({
    fileFilter:function(req , file , cb){
        if(file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)/)){
            cb(null , true);
        }
        else{
            cb(null , new Error("Only jpg /png /jpeg format files are allowed"));
        }
    },
    limits:{
        fileSize : 1024*1024*1
    }
})

var PostData = multer({
    fileFilter:function(req , file , cb){
        if(file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG|docx|DOCX|pdf|PDF)/)){
            cb(null , true);
        }
        else{
            cb(null , new Error("Only jpg /png /jpeg format files are allowed"));
        }
    },
    limits:{
        fileSize : 1024*1024*1
    }
})

module.exports = {
    ProfileData,
    PostData
}