require("dotenv").config();

const configs = {
  port: process.env.APP_PORT || 8080,
  region: process.env.APP_AWS_REGION,
  accessKeyID: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  bucketImage: process.env.APP_AWS_BUCKET_S3,
  bucketImageResized: process.env.APP_AWS_BUCKET_S3_RESIZED,
  userPoolName: process.env.APP_AWS_USER_POOL_NAME,
  userPoolClientName: process.env.APP_AWS_USER_POOL_CLIENT_NAME,
  userPoolID: process.env.APP_AWS_USER_POOL_ID,
  clientID: process.env.APP_AWS_CLIENT_ID,
  tables: {
    user: process.env.APP_DYNAMODB_USER_TABLE,
  },
};

module.exports = configs;
