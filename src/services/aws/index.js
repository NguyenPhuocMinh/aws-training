"use strict";

const cognitoServices = require('./cognito');
const s3Services = require("./s3");
const dynamoDBServices = require("./dynamoDB");

module.exports = {
  cognitoServices,
  s3Services,
  dynamoDBServices,
};
