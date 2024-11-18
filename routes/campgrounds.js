const express=require("express");
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground');
const {isLoggedIn,isAuthor,validateCamground}=require("../middleware.js");
const campground=require("../controllers/campgrounds.js")
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({storage});

router.route('/')
        .get(catchAsync(campground.index))
        .post(isLoggedIn,upload.array('image'),validateCamground,campground.createCampground)


router.get('/new',isLoggedIn,campground.newCampgroundForm)

router.get('/:id/edit',isLoggedIn,isAuthor,campground.editCampground)

router.route('/:id')
        .get(campground.showCampground)
        .put(isLoggedIn,isAuthor,upload.array('image'),validateCamground,campground.updateCampground)
        .delete(isLoggedIn,isAuthor,campground.deleteCampground)

module.exports=router;