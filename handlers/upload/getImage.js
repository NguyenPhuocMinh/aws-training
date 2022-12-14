'use strict';

import { awsS3 } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';
import { isEmpty } from 'lodash';

const getImage = async (event) => {
  try {
    const { fileID } = event.pathParameters;

    if (isEmpty(fileID)) {
      return handleResponse(400, { errMsg: 'FileID not found' });
    }
    
    const dstBucket = `${configs.awsBucketUpload}-${configs.awsRegion}`

    const params = {
      Bucket: dstBucket,
      Key: `uploads/${fileID}`,
      Expires: 60 * 5
    };
    
    const paramsResized = {
      Bucket: dstBucket,
      Key: `resized-uploads/${fileID}`,
      Expires: 60 * 5
    }

    const data = await awsS3.PreSignedSignedURL('getObject', params);
    
    const dataResized = await awsS3.PreSignedSignedURL('getObject', paramsResized);

    return handleResponse(200, {
      msg: 'Get image success',
      data: {
        url: data,
        urlResized: dataResized
      }
    });
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errMsg: errorMsg, stack: err.stack });
  }
};

export default getImage;
