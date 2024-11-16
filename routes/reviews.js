const express=require("express");
const router=express.Router({mergeParams:true});
const {reviewSchema}=require('../schemas.js')
const ExpressError=require('../utils/ExpressError')
const catchAsync=require('../utils/catchAsync');
const Campground= require('../models/campground');
const Review=require("../models/review.js");
const {validateReviews,isLoggedIn,isReviewAuthor}=require("../middleware.js")
router.post('/',isLoggedIn,validateReviews, catchAsync(async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    campground.reviews.push(review);
    review.author=req.user._id;
    await review.save();
    await campground.save();
    req.flash("success","Successfully Posted a Review!");
    res.redirect(`/campgrounds/${campground._id}`)

}))
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, catchAsync(async(req,res)=>{
    const {id,reviewId}= req.params;
    const campground = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully deleted the review!");
    res.redirect(`/campgrounds/${id}`)
}))
module.exports=router;