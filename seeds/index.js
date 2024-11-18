const mongoose= require('mongoose')
const cities=require('./cities')
const {names,descriptors}= require('./seedHelpers')
const campground= require('../models/campground')
const { name } = require('ejs')

mongoose.connect('mongodb://127.0.0.1:27017/yelp')
.then(()=>{
    console.log("mongoose(seed) CONNECTION ESTABLISHED")
})
.catch(err=>{
    console.log("ERROR")
})
const randomSample = array =>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random162= Math.floor(Math.random()*162)
        const random30=Math.floor(Math.random()*30)
        const price=((Math.floor((Math.random()*20)+1))*1000)-1
        const camp= new campground({
            title:`${randomSample(descriptors)} ${randomSample(names)}`,
            location:`${cities[random162].city}, ${cities[random162].admin_name}`,
            images:[
                {
                  url: 'https://res.cloudinary.com/djec3zuzn/image/upload/v1731942653/MakeYourTrip/c8ajopehuzjhayvfy2jc.jpg',
                  filename: 'MakeYourTrip/aup7sznlx91bzk2xozrv',
                },
                {
                  url: 'https://res.cloudinary.com/djec3zuzn/image/upload/v1731942653/MakeYourTrip/pfmr8tqzgkautttevkbk.jpg',
                  filename: 'MakeYourTrip/z604ylcau1madieclgla',
                },
                {
                  url: 'https://res.cloudinary.com/djec3zuzn/image/upload/v1731942653/MakeYourTrip/qfbgnjed1k7ksswii8z7.jpg',
                  filename: 'MakeYourTrip/z6g7sgunrcalymxjbani',
                }
              ],
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum beatae deleniti similique soluta accusamus reprehenderit magnam, ipsa, ex earum, animi culpa perferendis odit saepe! Labore veniam repudiandae eveniet commodi perferendis.",
            price,
            owner:"670c79a4cc7271b870247270"
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})