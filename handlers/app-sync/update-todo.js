'use strict';

import { awsDynamoDB } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const updateTodo = async (event) => {
  try {
    const { id, title, description } = event.data;

    const params = {
      TableName: configs.tables.todo,
      Key: {
        id: id
      },
      ExpressionAttributeNames: {
        '#T': 'title',
        '#D': 'description'
      },
      ExpressionAttributeValues: {
        ':t': title,
        ':d': description
      },
      UpdateExpression: 'SET #T = :t, #D = :d',
      ReturnValues: 'ALL_NEW'
    };

    const data = await awsDynamoDB.UpdateData(params);

    return handleResponse(200, { msg: 'Update success', data });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg, stack: err.stack });
  }
};

export default updateTodo;
