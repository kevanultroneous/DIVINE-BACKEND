const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const jwt = require("jsonwebtoken");


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(
        new catchAppError(401, "You are not logged in. Please login to access.")
      );
    }
  
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    next();
  });


exports.userProtect = catchAsync(async (req, res, next) => {
  if(req.user.role==='user'){
      return next(new catchAppError("You Are Not Authorized", 401));
    }
    next();
})