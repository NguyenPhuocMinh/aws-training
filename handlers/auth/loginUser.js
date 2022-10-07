'use strict';

import { awsCognito, sentryServerless } from '../../common';
import { handleResponse, handleValidate } from '../../src/utils';
import configs from '../../configs';

const loginUser = sentryServerless.AWSLambda.wrapHandler(
  async (event) => {
    try {
      const isValid = handleValidate(event.body);

      if (!isValid) {
        sentryServerless.captureMessage('Input in valid');
        return handleResponse(400, { errorMsg: 'Input in valid' });
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
    } catch (err) {
      sentryServerless.captureException(err);
      const errorMsg = err.message ?? 'Internal server error';
      return handleResponse(500, { errorMsg, stack: err.stack });
    }
  },
  { captureAllSettledReasons: true, captureTimeoutWarning: false }
);

export default loginUser;
