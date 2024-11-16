const express=require("express");
const router=express.Router({mergeParams:true});
const review=require("../controllers/reviews.js")
const {validateReviews,isLoggedIn,isReviewAuthor}=require("../middleware.js")


router.post('/',isLoggedIn,validateReviews, review.createReview)
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, review.deleteReview)

module.exports=router;