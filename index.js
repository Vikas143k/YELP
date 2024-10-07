const express= require('express');
const path= require('path');
const mongoose= require('mongoose');
const Campground= require('./models/campground');
const {campgroundSchema,reviewSchema}=require('./schemas.js')
const ejsMate=require('ejs-mate');
const Joi=require('joi');
const ExpressError=require('./utils/ExpressError')
const catchAsync=require('./utils/catchAsync');
const methodOverride=require('method-override');
const Review=require("./models/review.js");
const campground = require('./models/campground');

const app= express();

app.use(methodOverride('_method'))
mongoose.connect('mongodb://127.0.0.1:27017/yelp')
.then(()=>{
    console.log("mongoose CONNECTION ESTABLISHED")
})
.catch(err=>{
    console.log("ERROR")
})

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))

const validateCamground=(req,res,next)=>{
    const {error}=campgroundSchema.validate(req.body)
    if(error){
        console.log(error);
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400)
    }
    else next();
}
const validateReviews=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400)
    }
    else next();
}

app.get('/campgrounds',catchAsync( async (req,res)=>{
    const campground= await Campground.find({})
    res.render('campgrounds/index', {campground})
}))
app.get('/campgrounds/new',catchAsync( async (req,res)=>{
    res.render("campgrounds/new")
}))
app.post('/campgrounds', validateCamground,catchAsync(async (req,res, next)=>{
        const campground= new Campground(req.body.campground);
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)
  
}))
app.get('/campgrounds/:id/edit',catchAsync(async (req,res)=>{
    const camp=await Campground.findById(req.params.id)
    res.render("campgrounds/edit",{camp})  
}))
app.put('/campgrounds/:id',validateCamground,catchAsync(async (req,res)=>{
        const {id}=req.params;
        const campground =await Campground.findByIdAndUpdate(id, { ...req.body.Campground });
        res.redirect(`/campgrounds/${campground._id}`)
}))
app.delete('/campgrounds/:id',catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
}))
//reviews
app.post('/campgrounds/:id/reviews',validateReviews, catchAsync(async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)

}))
app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async(req,res)=>{
    const {id,reviewId}= req.params;
    const campground = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}))

app.get('/campgrounds/:id', catchAsync(async (req,res)=>{
    const  campground= await Campground.findById(req.params.id).populate("reviews");
    res.render("campgrounds/show", {campground})
}))


app.get('/',(req,res)=>{
    res.render("home")
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404))
})
app.use((err, req,res, next)=>{
    const {statusCode=500}=err;
    if(!err.message) err.message="SOMETHING WENT WRONG!!!!!!!!!!"
    res.status(statusCode).render('error',{err});
})


app.listen(3000, ()=>{
    console.log("Serving on port 3000")
})