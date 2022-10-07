'use strict';

import util from 'util';
import jimp from 'jimp';
import { awsS3 } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const resizeImage = async (event) => {
  try {
    console.log(
      'Reading options from event:\n',
      util.inspect(event, { depth: 5 })
    );
    const { Records } = event;
    const srcBucket = Records[0].s3.bucket.name;

    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey = decodeURIComponent(
      Records[0].s3.object.key.replace(/\+/g, ' ')
    );

    const dstBucket = `${configs.awsBucketUpload}-${configs.awsRegion}`;
    const dstKey = 'resized-' + srcKey;

    if (Records[0].eventName === 'ObjectRemoved:Delete') {
      const paramsDelete = {
        Bucket: dstBucket,
        Key: dstKey
      };

      // Delete for folder resized-uploads
      await awsS3.DeleteData(paramsDelete);

      console.log(`Deleted successfully!`);
    }

    // Infer the image type from the file suffix.
    const typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
      console.log('Could not determine the image type.');
      return;
    }

    // Check that the image type is supported
    const imageType = typeMatch[1].toLowerCase();
    if (imageType != 'jpg' && imageType != 'png') {
      console.log(`Unsupported image type: ${imageType}`);
      return;
    }

    // Download the image from the S3 source bucket.
    const params = {
      Bucket: srcBucket,
      Key: srcKey
    };

    const originalImage = await awsS3.GetData(params);

    // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
    const width = 200;

    // Use the sharp module to resize the image and save in a buffer.
    const jimpImage = await jimp.read(originalImage.Body);
    const mime = jimpImage.getMIME();

    const buffer = await jimpImage
      .resize(width, jimp.AUTO)
      .getBufferAsync(mime);

    // Upload the thumbnail image to the destination bucket
    const destParams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: 'image'
    };

    const putResult = await awsS3.PutData(destParams);

    console.log(
      'Successfully resized ' +
        srcBucket +
        '/' +
        srcKey +
        ' and uploaded to ' +
        dstBucket +
        '/' +
        dstKey
    );
  } catch (err) {
    const errorMsg = err.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg, stack: err.stack });
  }
};

export default resizeImage;
