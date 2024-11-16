const express=require("express");
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCamground}=require("../middleware.js");
router.get('/',catchAsync( async (req,res)=>{
    const campground= await Campground.find({})
    res.render('campgrounds/index', {campground})
}))

router.get('/new',isLoggedIn,catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
}))

router.post('/', isLoggedIn,validateCamground,catchAsync(async (req,res, next)=>{
        const campground= new Campground(req.body.campground);
        campground.owner=req.user._id;
        await campground.save();
        req.flash("success","Successfully made a new Campground");
        res.redirect(`/campgrounds/${campground._id}`)
  
}))

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(async (req,res)=>{
    const {id}=req.params;
    const camp=await Campground.findById(id);
    if(!camp){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit",{camp})  
}))

router.get('/:id', catchAsync(async (req,res)=>{
    // const  campground= await Campground.findById(req.params.id).populate("reviews").populate("owner");
    const  campground= await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate("owner");
    console.log(campground);
    if(!campground){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground})
}))

router.put('/:id',isLoggedIn,isAuthor,validateCamground,catchAsync(async (req,res)=>{
    const {id}=req.params;
        // const campground=await Campground.findById(id);
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        req.flash("success","Successfully Updated Campground");
        res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id',isLoggedIn,isAuthor,catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted the Campground");
    res.redirect("/campgrounds")
}))

module.exports=router;