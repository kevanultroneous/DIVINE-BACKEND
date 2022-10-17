const express = require("express");
const router = express.Router();
const templesController = require("../controllers/templesController");
const aboutUsController = require("../controllers/aboutUsController");
const testimonialsController = require("../controllers/testimonialsController");
const userController = require("../controllers/userController");
const inquireDataController = require("../controllers/inquireDataController");
const authController = require("../controllers/authController");

router.post(
  "/addtemple",
  authController.protect,
  authController.userProtect,
  templesController.uploadTemplePhoto,
  templesController.resizePhoto,
  templesController.addTemple
);

router.post("/deletetemples", authController.protect,
  authController.userProtect, templesController.deleteTemples);
router.post(
  "/updatetemples",
  authController.protect,
  authController.userProtect,
  templesController.uploadTemplePhoto,
  templesController.resizePhoto,
  templesController.updateTemples
);

router.post("/addframe", templesController.uploadTemplePhoto, templesController.addFrame);

router.get("/getlistbytype", templesController.getListByType);
router.get("/gettemplebyid/:id", templesController.getTemplesById);

router.get("/getrelatedproduct/:id", templesController.getRelatedProduct);

router.get("/gettemplesadmin", authController.protect, authController.userProtect, templesController.getTemplesAdmin);

router.post("/addaboutus", aboutUsController.addAboutUs);
router.get("/getaboutus", aboutUsController.getAboutUs);

router.post("/addtestimonials", testimonialsController.addTestimonials);
router.get("/getalltestimonials", authController.protect, authController.userProtect, testimonialsController.getAllTestimonials);

router.post(
  "/signup",
  userController.uploadUserPhotos,
  userController.resizeUserPhoto,
  userController.signUp
);
router.post("/signin", userController.signIn);
router.get(
  "/getalluser",
  authController.protect,
  authController.userProtect,
  userController.getAllUser
);

router.post("/addinquiredata", inquireDataController.addInquireData);
router.get("/getinquiredata", inquireDataController.getInquireData);
router.post(
  "/isinquirecompeleted",
  authController.protect,
  authController.userProtect,
  inquireDataController.isInquireCompeleted
);



module.exports = router;