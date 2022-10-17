const InquireData = require("../models/inquireDataModel");
const catchAppError = require("../utils/catchAppError");
const catchAsync = require("../utils/catchAsync");

exports.addInquireData = catchAsync(async (req, res, next) => {


  const data = await InquireData.create({
    name: req.body.name,
    templename: req.body.templename,
    email: req.body.email,
    phone: req.body.phone,
    frame: req.body.frame,
    width: req.body.width,
    height: req.body.height,
    depth: req.body.depth,
    description: req.body.description,
  });
  res.status(200).json({
    status: "success",
    message: "Inquire Successfully Added",
    data,
  });
});

exports.getInquireData = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  if (!page) page = 1;
  const limits = parseInt(limit);
  const skip = (page - 1) * limit;
  const total_documents = await InquireData.countDocuments();
  const data = await InquireData.find().limit(limits).skip(skip);
  res.status(200).json({
    status: "success",
    data,
    total_documents,
  });

}); 



exports.isInquireCompeleted = catchAsync(async (req, res, next) => {
  if (!req.body.id) {
    {
      return next(new catchAppError("Please enter all the fields", 405));
    }
  }

  const data = await InquireData.findOneAndUpdate(
    { _id: req.body.id },
    { isinquirecompeleted: req.body.value },
    {new:true}
  );
    res.status(200).json({
      status: "success",
      data,
    }); 
});
