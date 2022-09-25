"use strict";

const dynamoose = require("dynamoose");
const configs = require("../../../configs");

const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: configs.accessKeyID,
  secretAccessKey: configs.secretAccessKey,
  region: configs.region,
});

dynamoose.aws.ddb.set(ddb);

module.exports = dynamoose;
