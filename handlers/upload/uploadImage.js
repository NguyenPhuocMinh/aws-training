'use strict';

import { awsS3 } from '../../common';
import { handleResponse, handleValidateUploadImage } from '../../src/utils';
import configs from '../../configs';

const uploadImage = async (event) => {
  try {
    const isValid = handleValidateUploadImage(event.body);

    if (!isValid) {
      return handleResponse(400, { errMsg: 'Data invalid' });
    }

    const { image } = JSON.parse(event.body);

    const key =
      'file-' + Math.floor(10000000000 + Math.random() * 90000000000) + '.jpg';
    const base64Data = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    const params = {
      Bucket: `${configs.awsBucketUpload}-${configs.awsRegion}`,
      Key: `uploads/${key}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Expires: 60 * 5
    };

    await awsS3.PutData(params);

    return handleResponse(200, {
      msg: 'Upload success',
      fileName: key
    });
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errMsg: errorMsg, stack: err.stack });
  }
};

export default uploadImage;
