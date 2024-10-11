const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    // username:{
    //     type:String,
    //     required:true
    // },
    // Password:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})


UserSchema.plugin(passportLocalMongoose); // very Important
module.exports=mongoose.model('User',UserSchema);