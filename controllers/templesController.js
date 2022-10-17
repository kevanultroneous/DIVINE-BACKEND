const Temple = require("../models/templesModel");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const sharp = require("sharp");
const Frames = require("../models/addFrameModel");
const mongoose = require("mongoose");

// IMAGE CONFIGURATION
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new catchAppError("Not an image! Please upload only images.", 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTemplePhoto = upload.fields([
  { name: "image", maxCount: 10 },
  { name: "frameimage", maxCount: 1 },
]);
//sharp use resize
exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.files.image) return next();

  // image
  req.body.image = [];

  await Promise.all(
    req.files.image.map(async (file, i) => {
      const filename = `${req.body.name}-${i + 1}-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        .resize(377, 377)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/temples/${filename}`);

      req.body.image.push(filename);
    })
  );

  next();
});

exports.addTemple = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.information ||
    !req.body.stock ||
    !req.body.productInformation ||
    !req.body.image
  ) {
    return next(new catchAppError("Please enter all the fields", 405));
  }
  const name = req.body.name;
  const paths = await Temple.findOne({ name });

  if (paths) {
    return next(new catchAppError("Temple is already added", 405));
  }

  const data = await Temple.create({
    name: req.body.name,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    information: req.body.information,
    stock: req.body.stock,
    productInformation: req.body.productInformation,
    type: req.body.type,
    image: req.body.image
  });
  imageNew = [];
  for (let index = 0; index < data.image.length; index++) {
    imageNew.push(process.env.API_URL + "/public/temples/" + data.image[index]);
  }
  data.image = imageNew;

  res.status(200).json({
    status: "success",
    data
  });
});

exports.addFrame = catchAsync(async (req, res, next) => {
  if (!req.body.templeid) {
    return next(new catchAppError("Please enter templeid", 405));
  }
  const id = mongoose.Types.ObjectId(req.body.templeid);
  // FrameImage
  if (!req.files) return next();

  req.body.frameimage = `frame-${Date.now()}.jpeg`;

  await sharp(req.files.frameimage[0].buffer)
    .resize(83, 88)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/frames/${req.body.frameimage}`);

  res.status(200).json({
    status: "success",
    data
  });
})

exports.getListByType = catchAsync(async (req, res, next) => {

  var { page, limit, type } = req.query;
  if (!page) page = 1;
  const limits = parseInt(limit);
  const skip = (page - 1) * limit;

  const data = await Temple.find({ type: "decor" }).limit(10).skip(skip).exec();
  const total_documents = await Temple.find({ type: type }).count();
  for (let index = 0; index < data.length; index++) {
    const imageNew = [];
    for (let i = 0; i < data[index].image.length; i++) {
      imageNew.push(
        process.env.API_URL + "/public/temples/" + data[index].image[i]
      );
    }
    data[index].image = imageNew;
  }
  res.status(200).json({
    status: "success",
    data,
    total_documents
  });
});
exports.getTemplesAdmin = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  if (!page) page = 1;
  const limits = parseInt(limit);
  const skip = (page - 1) * limit;
  const total_documents = await Temple.countDocuments();
  const data = await Temple.find().limit(limits).skip(skip).sort([['updatedAt', -1]]).exec();

  for (let index = 0; index < data.length; index++) {
    const imageNew = [];
    for (let i = 0; i < data[index].image.length; i++) {
      imageNew.push(
        process.env.API_URL + "/public/temples/" + data[index].image[i]
      );
    }
    data[index].image = imageNew;
  }
  res.status(200).json({
    status: "success",
    data,
    total_documents,
  });
});

exports.getTemplesById = catchAsync(async (req, res, next) => {

  const data = await Temple.findOne({ _id: req.params.id });
  const imageNew = [];
  for (let index = 0; index < data.image.length; index++) {
    imageNew.push(process.env.API_URL + "/public/temples/" + data.image[index]);
  }
  data.image = imageNew;
  res.status(200).json({
    status: "success",
    data
  });

});
exports.getRelatedProduct = catchAsync(async (req, res, next) => {
  let { page, limit, type } = req.query;
  if (!page) page = 1;
  const limits = parseInt(limit);
  const skip = (page - 1) * limit;

  const data = await Temple.find({ '_id': { $ne: req.params.id }, type: type }).limit(limits).skip(skip)
  for (let index = 0; index < data.length; index++) {
    let imageNew = [];
    for (let i = 0; i < data[index].image.length; i++) {
      imageNew.push(
        process.env.API_URL + "/public/temples/" + data[index].image[i]
      );
    }
    data[index].image = imageNew;
  }

  res.status(200).json({
    status: "success",
    data
  });

});

exports.deleteTemples = catchAsync(async (req, res, next) => {
  if (!req.body.id) {
    return next(new catchAppError("Please enter id", 405));
  }
  const data = await Temple.findByIdAndDelete({ _id: req.body.id });
  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.updateTemples = catchAsync(async (req, res, next) => {
  if (!req.body.id) {
    return next(new catchAppError("Please enter id", 405));
  }
  const data = await Temple.findOneAndUpdate(
    { _id: req.body.id },

    {
      name: req.body.name,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      productInformation: req.body.productInformation,
      information: req.body.information,
      active: req.body.active,
      type: req.body.type,
      image: req.body.image
    },
    { new: true }
  );
  imageNew = [];
  for (let index = 0; index < data.image.length; index++) {
    imageNew.push(process.env.API_URL + "/public/temples/" + data.image[index]);
  }
  data.image = imageNew;
  res.status(200).json({
    status: "success",
    data,
  });
});

