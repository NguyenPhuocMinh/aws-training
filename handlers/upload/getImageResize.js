'use strict';

import { awsS3 } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';
import { isEmpty } from 'lodash';

const getImageResize = async (event) => {
  try {
    const { fileID } = event.pathParameters;

    if (isEmpty(fileID)) {
      return handleResponse(400, { errMsg: 'FileID not found' });
    }

    const params = {
      Bucket: `${configs.awsBucketUpload}-${configs.awsRegion}`,
      Key: `resized-uploads/${fileID}`,
      Expires: 60 * 5
    };

    const data = await awsS3.PreSignedSignedURL('getObject', params);

    return handleResponse(200, {
      msg: 'Get image success',
      data: {
        url: data
      }
    });
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errMsg: errorMsg, stack: err.stack });
  }
};

export default getImageResize;
