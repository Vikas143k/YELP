const Campground = require('../models/campground');
const catchAsync=require('../utils/catchAsync');
const {cloudinary}=require('../cloudinary');

module.exports.index=async(req,res)=>{
    const campground= await Campground.find({})
    res.render('campgrounds/index', {campground})
}
module.exports.newCampgroundForm=catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
})

module.exports.createCampground=catchAsync(async (req,res, next)=>{
    const maptilersdk = await import('@maptiler/sdk');
//   const { GeocodingControl } = await import('@maptiler/geocoding-control/maptilersdk');
  maptilersdk.config.apiKey=process.env.MAPTILLER_TOKEN;
  const query = req.body.campground.location;
  const response = await maptilersdk.geocoding.forward(query, { limit: 1 });
//   console.log(response.features.coordinates);
    const campground= new Campground(req.body.campground);
    campground.geometry=response.features[0].geometry;
    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}))
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
    console.log(campground);
    res.render("campgrounds/show", {campground})
})
module.exports.updateCampground=catchAsync(async (req,res)=>{
    const {id}=req.params;
    console.log(req.body);
        // const campground=await Campground.findById(id);
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        const img=req.files.map(f=>({url:f.path,filename:f.filename}))
        campground.images.push(...img);
        await campground.save();
        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
                await cloudinary.uploader.destroy(filename);
            }
        await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
            console.log(campground);
    }
        req.flash("success","Successfully Updated Campground");
        res.redirect(`/campgrounds/${campground._id}`)
})
module.exports.deleteCampground=catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted the Campground");
    res.redirect("/campgrounds")
});
