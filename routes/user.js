const express=require("express");
const router=express.Router();
const { storeReturnTo } = require('../middleware');
const passport = require("passport");

const user=require("../controllers/user")

router.get("/register",user.registerUser)
router.post("/register",user.createUser)
router.get("/login",user.renderLoginForm)
router.post("/login",storeReturnTo,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),user.loginUser)

router.get('/logout',user.logoutUser)

module.exports=router;
