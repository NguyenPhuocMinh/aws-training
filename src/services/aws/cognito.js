'use strict';

const Promise = require('bluebird');
const aws = require('aws-sdk');

const cognito = new aws.CognitoIdentityServiceProvider();

/**
 * @description Create User
 * @param {*} params 
 */
const AdminCreateUser = async (params) => {
  try {
    const data = await cognito.adminCreateUser(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Login user
 * @param {*} params 
 */
const AdminInitiateAuth = async (params) => {
  try {
    const data = await cognito.adminInitiateAuth(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

const SetUserPassword = async (params) => {
  try {
    const data = await cognito.adminSetUserPassword(params).promise();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const GetUser = async (params) => {
  try {
    const data = await cognito.getUser(params).promise();

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const cognitoServices = {
  AdminCreateUser,
  AdminInitiateAuth,
  SetUserPassword,
  GetUser,
};

module.exports = cognitoServices;
