const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhotos = upload.single("image");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `${req.body.name}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.filename}`);

  next();
});

exports.signUp = catchAsync(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone
  ) {
    return next(new catchAppError("Please enter all the fields", 405));
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new catchAppError("User Already Registered", 405));
  }
  const number = await User.findOne({ phone: req.body.phone });
  if (number) {
    return next(new catchAppError("Phone Number Is Already Registered", 405));
  }

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  if (req.file) {
    req.body.image = `${req.file.filename}`;
  }

  const data = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
    phone: req.body.phone,
    image: req.body.image,
  });
  imageNew = [];
  for (let index = 0; index < data.image.length; index++) {
    imageNew.push(process.env.API_URL + "/public/users/" + data.image[index]);
  }
data.image=imageNew
  res.status(200).json({
    status: "success",
    message: "Successfully SignUp",
    data,
  });
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signIn = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new catchAppError("Please enter all the fields", 405));
  }

  const data = await User.findOne({ email: req.body.email });
  if (data) {
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    const token = signToken(data._id);
    if (validPassword && data.role === "admin") {
      res.status(200).json({
        status: "success",
        message: "Successfully SignIn",
        token,
        data,
      });
    } else {
      res.status(405).json({
        status: "fail",
        message: "Invaild Details",
      });
    }
  } else {
    res.status(405).json({  
      status: "fail",
      message: "Invaild Details",
    });
  }
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const data = await User.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});
