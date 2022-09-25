"use strict";

const Promise = require("bluebird");
const aws = require("aws-sdk");

const configs = require("../../../configs");

aws.config.setPromisesDependency(Promise);

const dynamoDB = new aws.DynamoDB.DocumentClient({
  region: configs.region,
});

/**
 * @description Get data from dynamoDB AWS
 * @param {*} params
 */
const GetData = async (params = {}) => {
  try {
    const { Item } = await dynamoDB.get(params).promise();

    return Item;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Create data to dynamoDB AWS
 * @param {*} params
 */
const CreateData = async (params = {}) => {
  try {
    await dynamoDB.put(params).promise();

    return { msg: "Create success" };
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Scan data from dynamoDB AWS
 * @param {*} params
 */
const ScanData = async (params) => {
  try {
    const { Items } = await dynamoDB.scan(params).promise();

    return Items;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Delete data from dynamoDB AWS
 * @param {*} params
 */
const DeleteData = async (params) => {
  try {
    await dynamoDB.delete(params).promise();

    return { msg: "Delete success" };
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Query data by condition from dynamoDB AWS
 * @param {*} params
 */
const QueryData = async (params) => {
  try {
    const { Items } = await dynamoDB.query(params).promise();

    return Items;
  } catch (err) {
    return Promise.reject(err);
  }
};

const dynamoDBServices = {
  dynamoDB,
  GetData,
  CreateData,
  ScanData,
  DeleteData,
  QueryData,
};

module.exports = dynamoDBServices;
