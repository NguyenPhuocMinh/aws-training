"use strict";

const express = require("express");
const { aws, multer } = require("../services");
const { handleError, handleSuccess } = require("../utils");
const configs = require("../../configs");

const uploadRouter = express.Router();

/**
 * @description Upload file
 */
uploadRouter.post(
  "/uploads/file",
  multer.uploadSingleLocal,
  async (req, res) => {
    const { originalname, buffer } = req.file;
    try {
      const params = {
        Bucket: configs.bucketImage,
        Key: originalname,
        Body: buffer,
      };

      const data = await aws.s3Services.UploadData(params);

      handleSuccess(res, data);
    } catch (err) {
      handleError(res, err);
    }
  }
);

/**
 * @description Upload image base64
 */
uploadRouter.post("/uploads/image/base64", async (req, res) => {
  console.log(
    "🚀 ~ file: upload-router.js ~ line 29 ~ uploadRouter.post ~ req",
    req.body
  );
  const { imageBase64 } = req.body;

  const key =
    "file-" + Math.floor(10000000000 + Math.random() * 90000000000) + ".jpg";
  const base64Data = Buffer.from(
    imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: configs.bucketImage,
    Key: key,
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  };

  try {
    const data = await aws.s3Services.PutData(params);

    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Get image base64
 */
uploadRouter.get("/uploads/image/base64/:key", async (req, res) => {
  const params = {};

  try {
    const data = await aws.s3Services.GetData(params);

    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = uploadRouter;
