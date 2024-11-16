const User=require("../models/user");

module.exports.registerUser=(req,res)=>{
    res.render("users/register");
}
module.exports.createUser=async(req,res,next)=>{
    try{
        const {email,username,password}=req.body.user;
        const user= new User({email,username});
        const registeredUser=await User.register(user,password);
        req.login(registeredUser,err =>{
            if(err) return next(err);
            req.flash("success","Welcome to Make Your Trip!")
            res.redirect("/campgrounds");
        })      
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("register");
    }
   
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login");
}
module.exports.loginUser=(req,res)=>{
    req.flash("success","Welcome Back");
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res)=>{
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        req.flash("success","You have been successfully logged Out!");
        res.redirect("/campgrounds");
    });
    
}