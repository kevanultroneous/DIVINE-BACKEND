const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.MONGODB_DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('DB connection successfully')
}).catch((error) => console.log(error));


