'use strict';

import { awsDynamoDB } from '../../common';
import { handleResponse } from '../../src/utils';
import configs from '../../configs';

const getTodos = async (event) => {
  try {
    const { selectionSetList } = event.info;

    const params = {
      TableName: configs.tables.todo,
      ProjectionExpression: selectionSetList.join(','),
      Limit: 10
    };

    const data = await awsDynamoDB.ScanData(params);

    return handleResponse(200, { msg: 'Get all success', data });
  } catch (error) {
    const errorMsg = error.message ?? 'Internal server error';
    return handleResponse(500, { errorMsg });
  }
};

export default getTodos;
