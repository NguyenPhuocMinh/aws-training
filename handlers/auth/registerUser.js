'use strict';

import { isEmpty } from 'lodash';
import { awsCognito, sentryServerless } from '../../common';
import configs from '../../configs';
import { handleResponse, handleValidate } from '../../src/utils';

const registerUser = sentryServerless.AWSLambda.wrapHandler(async (event) => {
  try {
    const isValid = handleValidate(event.body);

    if (!isValid) {
      return handleResponse(400, { errorMsg: 'Input in valid' });
    }

    const { email, password } = JSON.parse(event.body);

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

    const userRegister = await awsCognito.RegisterAdminUser(paramsRegister);

    if (!isEmpty(userRegister.User)) {
      const paramsSetPassword = {
        UserPoolId: configs.userPoolID,
        Username: email,
        Password: password,
        Permanent: true
      };
      await awsCognito.SetUserPassword(paramsSetPassword);
    }

    return handleResponse(200, {
      msg: 'Register User Success',
      data: JSON.parse(event.body)
    });
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg, stack: err.stack });
  }
});

export default registerUser;
