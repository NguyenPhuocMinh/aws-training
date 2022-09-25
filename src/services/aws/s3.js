"use strict";

const Promise = require("bluebird");
const aws = require("aws-sdk");

const configs = require("../../../configs");

aws.config.setPromisesDependency(Promise);

const s3 = new aws.S3({
  region: configs.region,
});

const GetData = async (params) => {
  try {
    const data = await s3.getObject(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Create Or Update File On S3
 * @param {*} params
 */
const PutData = async (params) => {
  try {
    const data = await s3.putObject(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Same PutObject S3
 * @param {*} params
 */
const UploadData = async (params) => {
  try {
    const data = await s3.upload(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const GetSignedURL = async (operation, params) => {
  try {
    const isExists = await CheckFileExists({
      bucketName: params.Bucket,
      key: params.Key,
    });

    if (!isExists) {
      return {
        msg: "File Not Found",
      };
    }

    const signedURL = s3.getSignedUrl(operation, params);
    return signedURL;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Check if the file/image exists in the s3 bucket
 */
const CheckFileExists = async ({ bucketName, key }) => {
  try {
    const exists = await s3
      .headObject({ Bucket: bucketName, Key: key })
      .promise();
    if (!exists) {
      return false;
    }
    return true;
  } catch (err) {
    return Promise.reject(err);
  }
};

const s3Services = {
  s3,
  GetData,
  PutData,
  UploadData,
  GetSignedURL,
  CheckFileExists,
};

module.exports = s3Services;
