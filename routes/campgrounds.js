const express=require("express");
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground');
const {campgroundSchema}=require('../schemas.js')

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

router.get('/new',catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
}))

router.post('/', validateCamground,catchAsync(async (req,res, next)=>{
        const campground= new Campground(req.body.campground);
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)
  
}))

router.get('/:id/edit',catchAsync(async (req,res)=>{
    const camp=await Campground.findById(req.params.id)
    console.log(camp);
    res.render("campgrounds/edit",{camp})  
}))

router.get('/:id', catchAsync(async (req,res)=>{
    const  campground= await Campground.findById(req.params.id).populate("reviews");
    res.render("campgrounds/show", {campground})
}))

router.put('/:id',validateCamground,catchAsync(async (req,res)=>{
    const {id}=req.params;
        console.log(id);
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        console.log(campground);
        res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id',catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
}))

module.exports=router;