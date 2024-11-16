const express=require("express");
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCamground}=require("../middleware.js");
const campground=require("../controllers/campgrounds.js")

router.route('/')
        .get(catchAsync(campground.index))
        .post(isLoggedIn,validateCamground,campground.createCampground)

router.get('/new',isLoggedIn,campground.newCampgroundForm)

router.get('/:id/edit',isLoggedIn,isAuthor,campground.editCampground)

router.route('/:id')
        .get(campground.showCampground)
        .put(isLoggedIn,isAuthor,validateCamground,campground.updateCampground)
        .delete(isLoggedIn,isAuthor,campground.deleteCampground)

module.exports=router;