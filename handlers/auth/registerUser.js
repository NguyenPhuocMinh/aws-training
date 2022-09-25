'use strict';

const { isEmpty } = require('lodash');
const { aws } = require('../../src/services');
const configs = require('../../configs');

const { handleResponse, handleValidate } = require('../../src/utils');

module.exports = async (event, context, callback) => {
  console.log(
    '🚀 ~ file: registerUser.js ~ line 8 ~ module.exports= ~ context',
    context
  );
  console.log(
    '🚀 ~ file: registerUser.js ~ line 8 ~ module.exports= ~ event',
    event
  );
  const { email, password } = JSON.parse(event.body);

  const isValid = handleValidate({ email, password });

  if (!isValid) {
    const error = handleResponse(400, { msg: 'Input in valid' });
    callback(null, error);
  }

  const paramsRegister = {
    UserPoolId: configs.userPoolID /* required */,
    Username: email /* required */,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'true'
      }
    ],
    ValidationData: [
      {
        Name: 'email' /* required */,
        Value: email
      }
    ]
  };

  const userRegister = await aws.cognitoServices.AdminCreateUser(
    paramsRegister
  );

  if (!isEmpty(userRegister.User)) {
    const paramsSetPassword = {
      UserPoolId: configs.userPoolID,
      Username: email,
      Password: password,
      Permanent: true
    };
    await aws.cognitoServices.SetUserPassword(paramsSetPassword);
  }

  const response = handleResponse(200, { msg: 'Register User Success' });

  callback(null, response);
};
