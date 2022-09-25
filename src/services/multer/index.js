"use strict";

const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3Services } = require("../aws");
const configs = require("../../../configs");

const storageLocal = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `https://s3.amazonaws.com/${configs.bucketImage}/`);
    },
    filename: function (req, file, cb) {
      const { fieldname: fieldName, originalname: originalName } = file;
      const dateTimestamp = Date.now();
      cb(
        null,
        fieldName +
          "-" +
          dateTimestamp +
          "." +
          originalName.split(".")[originalName.split(".").length - 1]
      );
    },
  }),
});

// const storageS3 = multerS3({
//   s3: s3Services.s3,
//   bucket: configs.bucketImage,
//   key: function (req, file, cb) {
//     const { fieldname: fieldName, originalname: originalName } = file;
//     const dateTimestamp = Date.now();
//     cb(
//       null,
//       fieldName +
//         "-" +
//         dateTimestamp +
//         "." +
//         originalName.split(".")[originalName.split(".").length - 1]
//     );
//   },
// });

const uploadSingleLocal = multer({
  storage: storageLocal,
}).single("file");

const uploadMultiLocal = multer({
  storage: storageLocal,
}).array("file", 12);

// const uploadSingleS3 = multer({
//   storage: storageS3,
// }).single("file");

// const uploadMultiS3 = multer({
//   storage: storageS3,
// }).array("file", 12);

const multerServices = {
  uploadSingleLocal,
  uploadMultiLocal,
  // uploadSingleS3,
  // uploadMultiS3,
};

module.exports = multerServices;
