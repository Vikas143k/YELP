const mongoose= require('mongoose')
const Review= require("./review.js");
const { required } = require('joi');
const Schema= mongoose.Schema;

const ImageSchema=new Schema( 
    {
    url:String,
    filename:String
    }
);
ImageSchema.virtual("thumbnail").get(function(){
    return this.url.replace('/upload','/upload/w_200');
})

const opts={toJSON:{virtuals:true}};
const campgroundSchema= new Schema({
    title: String,
    images:[ImageSchema],
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
      },      
    price:Number,
    description:String,
    location:String,
    owner:
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts)
campgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `
    <a href="/campgrounds/${this._id}" style="font-size: 2em;">${this.title}</a>
    <strong><p>${this.location}</p><strong>`;
});
campgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})
module.exports=mongoose.model('campground', campgroundSchema)