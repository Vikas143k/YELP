const express=require("express");
const router=express.Router({mergeParams:true});

const {reviewSchema}=require('../schemas.js')
const ExpressError=require('../utils/ExpressError')
const catchAsync=require('../utils/catchAsync');
const Campground= require('../models/campground');
const Review=require("../models/review.js");


const validateReviews=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400)
    }
    else next();
}
router.post('/',validateReviews, catchAsync(async(req,res)=>{
    console.log(req.params);
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)

}))
router.delete("/:reviewId", catchAsync(async(req,res)=>{
    const {id,reviewId}= req.params;
    const campground = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}))
module.exports=router;