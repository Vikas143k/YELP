const express=require("express");
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground');
const {campgroundSchema}=require('../schemas.js');
const {isLoggedIn}=require("../middleware.js");
router.get('/',catchAsync( async (req,res)=>{
    const campground= await Campground.find({})
    res.render('campgrounds/index', {campground})
}))

const validateCamground=(req,res,next)=>{
    const {error}=campgroundSchema.validate(req.body)
    if(error){
        console.log(error);
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400)
    }
    else next();
}

router.get('/new',isLoggedIn,catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
}))

router.post('/', isLoggedIn,validateCamground,catchAsync(async (req,res, next)=>{
        const campground= new Campground(req.body.campground);
        await campground.save();
        req.flash("success","Successfully made a new Campground");
        res.redirect(`/campgrounds/${campground._id}`)
  
}))

router.get('/:id/edit',isLoggedIn,catchAsync(async (req,res)=>{
    const camp=await Campground.findById(req.params.id);
    if(!camp){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit",{camp})  
}))

router.get('/:id', catchAsync(async (req,res)=>{
    const  campground= await Campground.findById(req.params.id).populate("reviews");
    if(!campground){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground})
}))

router.put('/:id',isLoggedIn,validateCamground,catchAsync(async (req,res)=>{
    const {id}=req.params;
        console.log(id);
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        req.flash("success","Successfully Updated Campground");
        res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id',isLoggedIn,catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted the Campground");
    res.redirect("/campgrounds")
}))

module.exports=router;