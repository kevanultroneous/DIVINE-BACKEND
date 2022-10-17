const Testimonials = require("../models/testimonialsModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

exports.addTestimonials = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.review || !req.body.rating) {
    return next(new catchAppError("Please enter all the fields", 405));
  }
  const data = await Testimonials.create({
    name: req.body.name,
    review: req.body.review,
    rating: req.body.rating
  });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllTestimonials = catchAsync(async (req, res, next) => {
  const data = await Testimonials.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});
