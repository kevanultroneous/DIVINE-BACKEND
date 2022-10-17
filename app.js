const express = require("express");
const cors = require("cors")
const app = express();
const path = require('path');
const mainRoute = require('./routes/mainRoutes')
const dotenv = require("dotenv");
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
require('./config');

app.use(express.static('public'));
dotenv.config({ path: "./config.env" });

app.use("/public/", express.static(path.join("public"))); // path for images
app.use('/api', mainRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status,
    message: err.message,
  });
});


app.listen(8000, () => {
  console.log("server listening at port 8000");
})