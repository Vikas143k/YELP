const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const { storeReturnTo } = require('../middleware');

router.get("/register",(req,res)=>{
    res.render("users/register");
})
router.post("/register",async(req,res,next)=>{
    // res.send(req.body.user);
    try{
        const {email,username,password}=req.body.user;
        const user= new User({email,username});
        const registeredUser=await User.register(user,password);
        req.login(registeredUser,err =>{
            if(err) return next(err);
            req.flash("success","Welcome to Make Your Trip!")
            res.redirect("/campgrounds");
        })
        // console.log(registeredUser);
      
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("register");
    }
   


})
router.get("/login",(req,res)=>{
    res.render("users/login");
})
router.post("/login",storeReturnTo,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","Welcome Back");
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
})

router.get('/logout',(req,res)=>{
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        req.flash("success","You have been successfully logged Out!");
        res.redirect("/campgrounds");
    });
    
})

module.exports=router;
