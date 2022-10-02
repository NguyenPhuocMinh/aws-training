'use strict';

import { awsDynamoDB } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const deleteTodo = async (event) => {
  try {
    const params = {
      TableName: configs.tables.todo,
      Key: {
        id: event.id
      }
    };

    await awsDynamoDB.DeleteData(params);

    return handleResponse(200, { msg: 'Delete success' });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg });
  }
};

export default deleteTodo;
