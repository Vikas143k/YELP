const Campground = require('../models/campground');
const catchAsync=require('../utils/catchAsync');
module.exports.index=async(req,res)=>{
    const campground= await Campground.find({})
    res.render('campgrounds/index', {campground})
}
module.exports.newCampgroundForm=catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
})

module.exports.createCampground=catchAsync(async (req,res, next)=>{
    const campground= new Campground(req.body.campground);
    campground.owner=req.user._id;
    await campground.save();
    req.flash("success","Successfully made a new Campground");
    res.redirect(`/campgrounds/${campground._id}`)

})

module.exports.editCampground=catchAsync(async (req,res)=>{
    const {id}=req.params;
    const camp=await Campground.findById(id);
    if(!camp){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit",{camp})  
})
module.exports.showCampground=catchAsync(async (req,res)=>{
    // const  campground= await Campground.findById(req.params.id).populate("reviews").populate("owner");
    const  campground= await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate("owner");
    if(!campground){
        req.flash('error',"Cannot find that Campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground})
})
module.exports.updateCampground=catchAsync(async (req,res)=>{
    const {id}=req.params;
        // const campground=await Campground.findById(id);
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        req.flash("success","Successfully Updated Campground");
        res.redirect(`/campgrounds/${campground._id}`)
})
module.exports.deleteCampground=catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted the Campground");
    res.redirect("/campgrounds")
})