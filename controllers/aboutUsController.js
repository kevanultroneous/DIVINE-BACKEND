const AboutUs = require('../models/aboutUsModel');
const catchAppError = require('../utils/catchAppError');
const catchAsync = require('../utils/catchAsync');

exports.addAboutUs = catchAsync(async (req, res, next) => {
  if (!req.body.text) {
    return next(new catchAppError("Please enter all the fields", 405))
  }
  const data = await AboutUs.create({
    title: req.body.title,
    text: req.body.text,
  })
  res.status(200).json({
    status: 'success',
    data
  });
})
exports.getAboutUs = catchAsync(async (req, res, next) => {
  const data = await AboutUs.find({});
  res.status(200).json({
    status: 'success',
    data
  });
})