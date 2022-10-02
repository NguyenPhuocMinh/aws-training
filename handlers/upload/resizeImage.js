'use strict';

import { handleResponse } from '../../src/utils';

const resizeImage = async (event, context, callback) => {
  try {
    console.log(
      '🚀 ~ file: resizeImage.js ~ line 6 ~ resizeImage ~ event',
      event
    );
  } catch (err) {
    return handleResponse(500, { errMsg: err.message, stack: err.stack });
  }
};

export default resizeImage;
