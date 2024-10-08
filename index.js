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

const app= express();


const campgrounds=require("./routes/campgrounds");
const reviews=require("./routes/reviews");


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


//reviews




app.use('/campgrounds',campgrounds);
app.use('/campgrounds/:id/reviews',reviews);

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