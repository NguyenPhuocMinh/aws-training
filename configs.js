'use strict';

require('dotenv').config();

const configs = {
  port: process.env.APP_PORT || 8080,
  awsStage: process.env.APP_AWS_STAGE,
  awsRegion: process.env.APP_AWS_REGION,
  awsAccessKey: process.env.APP_AWS_ACCESS_KEY,
  awsSecretKey: process.env.APP_AWS_SECRET_KEY,
  awsBucketUpload: process.env.APP_AWS_BUCKET_S3_UPLOAD,
  userPoolName: process.env.APP_AWS_USER_POOL_NAME,
  userPoolClientName: process.env.APP_AWS_USER_POOL_CLIENT_NAME,
  userPoolID: process.env.APP_AWS_USER_POOL_ID,
  userPoolClientID: process.env.APP_AWS_USER_POOL_CLIENT_ID,
  tables: {
    user: process.env.APP_DYNAMODB_USER_TABLE,
    todo: process.env.APP_DYNAMODB_TODO_TABLE
  },
  sentry: {
    dsn: process.env.APP_DSN_SENTRY_DSN
  }
};

export default configs;
