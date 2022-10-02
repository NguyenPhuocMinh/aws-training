'use strict';

import { reject } from 'bluebird';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const cognito = new CognitoIdentityServiceProvider();

/**
 * @description Create User
 * @param {*} params
 */
export const RegisterAdminUser = async (params) => {
  try {
    const data = await cognito.adminCreateUser(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Login user
 * @param {*} params
 */
export const LoginAdminUser = async (params) => {
  try {
    const data = await cognito.adminInitiateAuth(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Set password for user
 * @param {*} params
 */
export const SetUserPassword = async (params) => {
  try {
    const data = await cognito.adminSetUserPassword(params).promise();
    return data;
  } catch (err) {
    return reject(err);
  }
};

/**
 * @description Get Profile
 * @param {*} params
 */
export const GetProfile = async (params) => {
  try {
    const data = await cognito.getUser(params).promise();

    return data;
  } catch (err) {
    return reject(err);
  }
};
