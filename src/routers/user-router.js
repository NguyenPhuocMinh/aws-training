'use strict';

import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { awsDynamoDB } from '../../common';
import { handleError, handleSuccess } from '../utils';
import configs from '../../configs';
import { isEmpty } from 'lodash';

const userRouter = Router();

/**
 * @description Get All Data User From DynamoDB Aws
 */
userRouter.get('/users', async (req, res) => {
  try {
    const params = {
      TableName: configs.tables.user,
      ProjectionExpression: 'id, userName, email'
    };

    const data = await awsDynamoDB.ScanData(params);

    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Create User From DynamoDB Aws
 */
userRouter.post('/users', async (req, res) => {
  try {
    const { userName, email } = req.body;
    const params = {
      TableName: configs.tables.user,
      Item: {
        id: uuidV4(),
        userName,
        email
      }
    };

    const data = await awsDynamoDB.CreateData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Get Data User By Condition From DynamoDB Aws
 */
userRouter.get('/users/:id', async (req, res) => {
  try {
    const params = {
      TableName: configs.tables.user,
      Key: {
        id: req.params.id
      }
    };

    const data = await awsDynamoDB.GetData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

userRouter.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isEmpty(id)) {
      handleError(res, { statusCode: 400, message: 'Not found ID' });
    }

    const { userName, email } = req.body;

    const params = {
      TableName: configs.tables.user,
      Key: {
        id: req.params.id
      },
      ExpressionAttributeNames: {
        '#u': 'userName',
        '#e': 'email'
      },
      ExpressionAttributeValues: {
        ':u': userName,
        ':e': email
      },
      UpdateExpression: 'SET #u = :u, #e = :e',
      ReturnValues: 'ALL_NEW'
    };

    const data = await awsDynamoDB.UpdateData(params);

    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Delete User From DynamoDB Aws
 */
userRouter.delete('/users/:id', async (req, res) => {
  const params = {
    TableName: configs.tables.user,
    Key: {
      id: req.params.id
    }
  };

  try {
    const data = await awsDynamoDB.DeleteData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

export default userRouter;
