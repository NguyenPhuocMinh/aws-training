'use strict';

import { awsCognito } from '../../common';
import { handleResponse, handleValidate } from '../../src/utils';
import configs from '../../configs';

const loginUser = async (event) => {
  try {
    const isValid = handleValidate(event.body);

    if (!isValid) {
      return handleResponse(400, { msg: 'Input in valid' });
    }

    const { email, password } = JSON.parse(event.body);

    const params = {
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      UserPoolId: configs.userPoolID,
      ClientId: configs.userPoolClientID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };
    const data = await awsCognito.LoginAdminUser(params);

    return handleResponse(200, { msg: 'Login Success', data });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg });
  }
};

export default loginUser;
