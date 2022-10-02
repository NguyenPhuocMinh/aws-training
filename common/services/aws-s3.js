'use strict';

import { S3 } from 'aws-sdk';
import configs from '../../configs';

export const s3 = new S3({
  signatureVersion: 'v4',
  region: configs.awsRegion
});

export const GetData = async (params) => {
  try {
    const data = await s3.getObject(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Create Or Update File On S3
 * @param {*} params
 */
export const PutData = async (params) => {
  try {
    const data = await s3.putObject(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Delete File On S3
 * @param {*} params
 */
export const DeleteData = async (params) => {
  try {
    const data = await s3.deleteObject(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Same PutObject S3
 * @param {*} params
 */
export const UploadData = async (params) => {
  try {
    const data = await s3.upload(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Pre signed url S3
 * @param {*} operation
 * @param {*} params
 */
export const PreSignedSignedURL = async (operation, params) => {
  try {
    const signedURL = await s3.getSignedUrlPromise(operation, params);
    return signedURL;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Check if the file/image exists in the s3 bucket
 */
export const CheckFileExists = async ({ bucketName, key }) => {
  try {
    const exists = await s3
      .headObject({ Bucket: bucketName, Key: key })
      .promise();

    return !!exists;
  } catch (err) {
    return reject(err);
  }
};
