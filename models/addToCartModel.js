const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addToCartSchema = new Schema(
  {
   quantity: { 
     type: Number 
    },
    
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const AddToCart = mongoose.model("AddToCart", addToCartSchema);
module.exports = AddToCart;
