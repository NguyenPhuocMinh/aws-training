'use strict';

import { awsDynamoDB } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const getTodo = async (event) => {
  try {
    const params = {
      TableName: configs.tables.todo,
      Key: {
        id: event.id
      }
    };

    const data = await awsDynamoDB.GetData(params);

    return handleResponse(200, { msg: 'Get success', data });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg, stack: err.stack });
  }
};

export default getTodo;
