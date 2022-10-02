'use strict';

import multer, { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import configs from '../../configs';

const storageLocal = multer({
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, `https://s3.amazonaws.com/${configs.awsBucketImage}/`);
    },
    filename: function (req, file, cb) {
      const { fieldname: fieldName, originalname: originalName } = file;
      const dateTimestamp = Date.now();
      cb(
        null,
        fieldName +
          '-' +
          dateTimestamp +
          '.' +
          originalName.split('.')[originalName.split('.').length - 1]
      );
    }
  })
});

// const storageS3 = multerS3({
//   s3: s3Services.s3,
//   bucket: configs.awsBucketImage,
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
  storage: storageLocal
}).single('file');

const uploadMultiLocal = multer({
  storage: storageLocal
}).array('file', 12);

// const uploadSingleS3 = multer({
//   storage: storageS3,
// }).single("file");

// const uploadMultiS3 = multer({
//   storage: storageS3,
// }).array("file", 12);

const multerServices = {
  uploadSingleLocal,
  uploadMultiLocal
  // uploadSingleS3,
  // uploadMultiS3,
};

export default multerServices;
