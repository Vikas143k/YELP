const Campground= require('../models/campground');
const Review=require("../models/review.js");
const catchAsync=require('../utils/catchAsync');

module.exports.createReview=catchAsync(async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    campground.reviews.push(review);
    review.author=req.user._id;
    await review.save();
    await campground.save();
    req.flash("success","Successfully Posted a Review!");
    res.redirect(`/campgrounds/${campground._id}`)

})
module.exports.deleteReview=catchAsync(async(req,res)=>{
    const {id,reviewId}= req.params;
    const campground = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully deleted the review!");
    res.redirect(`/campgrounds/${id}`)
})
