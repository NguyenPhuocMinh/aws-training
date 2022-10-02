'use strict';

import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { awsDynamoDB } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const createTodo = async (event) => {
  try {
    const { title, description } = event.data;

    const dateNow = moment().format('YYYY-MM-DD'); // AWS_DATE

    const params = {
      TableName: configs.tables.todo,
      Item: {
        id: uuidV4(),
        title,
        description,
        createdAt: dateNow,
        createdBy: 'SYSTEM',
        updatedAt: dateNow
      }
    };

    const data = await awsDynamoDB.CreateData(params);

    return handleResponse(200, { msg: 'Create success', data });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg });
  }
};

export default createTodo;
