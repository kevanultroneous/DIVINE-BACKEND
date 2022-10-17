const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialsSchema= new Schema({

    name:{
        type:String,
        require:true
    },
    review:{
        type:String,
        required: true
    },
  
    rating:{
        type:String,
        required: true
    },
    image:{
        type:String
    }

})
const Testimonials=mongoose.model('testimonials',testimonialsSchema);
module.exports=Testimonials