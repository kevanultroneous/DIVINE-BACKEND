const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquireDataSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    templename: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
    },
    frame: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    depth: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isinquirecompeleted:{
      type:Boolean,
      default: 'false'
    }
  },
  { timestamps: true }
);

const InquireData = mongoose.model("InquireData", inquireDataSchema);
module.exports = InquireData;
