'use strict';

import { awsS3 } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';
import { isEmpty } from 'lodash';

const deleteImage = async (event) => {
  console.log(
    '🚀 ~ file: deleteImage.js ~ line 9 ~ deleteImage ~ event',
    event
  );
  try {
    const { fileID } = event.pathParameters;
    if (isEmpty(fileID)) {
      return handleResponse(400, { errorMsg: 'FileID not found' });
    }

    const dstBucket = `${configs.awsBucketUpload}-${configs.awsRegion}`;

    const params = {
      Bucket: dstBucket,
      Key: `uploads/${fileID}`
    };

    // Delete for folder uploads
    await awsS3.DeleteData(params);

    return handleResponse(200, { msg: 'Delete file success' });
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errMsg: errorMsg, stack: err.stack });
  }
};

export default deleteImage;
