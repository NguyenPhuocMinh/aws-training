"use strict";

const express = require("express");
const uuidV4 = require("uuid").v4;
const { aws } = require("../services");
const { handleError, handleSuccess } = require("../utils");
const configs = require("../../configs");

const userRouter = express.Router();

/**
 * @description Get All Data User From DynamoDB Aws
 */
userRouter.get("/users", async (req, res) => {
  try {
    const params = {
      TableName: configs.tables.user,
      ProjectionExpression: "id, userName, email",
    };

    const data = await aws.dynamoDBServices.ScanData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Create User From DynamoDB Aws
 */
userRouter.post("/users", async (req, res) => {
  try {
    const { userName, email } = req.body;
    const params = {
      TableName: configs.tables.user,
      Item: {
        id: uuidV4(),
        userName,
        email,
      },
    };

    const data = await aws.dynamoDBServices.CreateData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Get Data User By Condition From DynamoDB Aws
 */
userRouter.get("/users/:id", async (req, res) => {
  try {
    const params = {
      TableName: configs.tables.user,
      Key: {
        id: req.params.id,
      },
    };

    const data = await aws.dynamoDBServices.GetData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

/**
 * @description Delete User From DynamoDB Aws
 */
userRouter.delete("/users/:id", async (req, res) => {
  const params = {
    TableName: configs.tables.user,
    Key: {
      id: req.params.id,
    },
  };

  try {
    const data = await aws.dynamoDBServices.DeleteData(params);
    handleSuccess(res, data);
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = userRouter;
