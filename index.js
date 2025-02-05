if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}

const express= require('express');
const path= require('path');
const mongoose= require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const session =require('express-session');
const flash=require('connect-flash');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const app= express();

const User=require("./models/user");
const ExpressError=require('./utils/ExpressError')
const campgroundRoutes=require("./routes/campgrounds");
const reviewRoutes=require("./routes/reviews");
const userRoutes=require("./routes/user");
// const session = require('express-session');
const MongoStore = require('connect-mongo');


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const connectSrcUrls = [
    "https://api.maptiler.com/",
];
const fontSrcUrls = [];
const helmet=require("helmet");
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/djec3zuzn/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp';

// 'mongodb://127.0.0.1:27017/yelp'
mongoose.connect(dbURL)
.then(()=>{
    console.log("mongoose CONNECTION ESTABLISHED")
})
.catch(err=>{
    console.log("ERROR")
})


// const { MongoClient, ServerApiVersion } = require('mongodb');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient('mongodb://127.0.0.1:27017/yelp', {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});
store.on("error",function(e){
    console.log("SESSION STORE ERROR",e)
})
const sessionConfig={
    store:store,
     secret:"thisisSecret",
     resave:false,
     saveUninitialized:true,
     cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
     }
}
app.use(session(sessionConfig))
app.use(flash());
const mongoSanitize = require('express-mongo-sanitize');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(mongoSanitize());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
app.use("/",userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);
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