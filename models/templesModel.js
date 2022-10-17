const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TemplesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String

    },
    information: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
    active: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'temple',
      enum: ['temple', 'decor']
    },
    stock: {
      type: String,
      required: true,
    },
    productInformation: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Temple = mongoose.model("Temple", TemplesSchema);
module.exports = Temple;
