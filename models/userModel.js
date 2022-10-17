const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true  
    },
    password:{
        type:String,
        required: true,  
    },
    phone:{
        type:Number,
        unique:true
    },
    image:{
      type:String
    },
     role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }

}, { timestamps: true })


const User=mongoose.model('User', userSchema);
module.exports=User