const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const framesSchema = new Schema(
  {
    temple_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    frameimage: {
      type: String,
    },
    framename: {
      type: String,
    },
  }
);
const Frames = mongoose.model("frames", framesSchema);
module.exports = Frames;
