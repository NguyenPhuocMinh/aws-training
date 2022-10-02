'use strict';

import { reject } from 'bluebird';
import { DynamoDB } from 'aws-sdk';
import configs from '../../configs';

export const dynamoDB = new DynamoDB.DocumentClient({
  region: configs.awsRegion
});

/**
 * @description Get data from dynamoDB AWS
 * @param {*} params
 */
export const GetData = async (params = {}) => {
  try {
    const { Item } = await dynamoDB.get(params).promise();

    return Item;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Create data to dynamoDB AWS
 * @param {*} params
 */
export const CreateData = async (params = {}) => {
  try {
    await dynamoDB.put(params).promise();

    return { msg: 'Create success' };
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Scan data from dynamoDB AWS
 * @param {*} params
 */
export const ScanData = async (params) => {
  try {
    const { Items } = await dynamoDB.scan(params).promise(); // limit 1MB data

    return Items;
  } catch (err) {
    return reject(err);
  }
};

export const UpdateData = async (params) => {
  console.log("🚀 ~ file: aws-dynamodb.js ~ line 54 ~ UpdateData ~ params", params)
  try {
    const data = await dynamoDB.update(params).promise();
    console.log("🚀 ~ file: aws-dynamodb.js ~ line 57 ~ UpdateData ~ data", data)
    return data;
  } catch (err) {
    reject(err);
  }
};

/**
 * @description Delete data from dynamoDB AWS
 * @param {*} params
 */
export const DeleteData = async (params) => {
  try {
    await dynamoDB.delete(params).promise();

    return { msg: 'Delete success' };
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Query data by condition from dynamoDB AWS
 * @param {*} params
 */
export const QueryData = async (params) => {
  try {
    const { Items } = await dynamoDB.query(params).promise();

    return Items;
  } catch (err) {
    return reject(err);
  }
};
