export * as awsCognito from './services/aws-cognito';
export * as awsS3 from './services/aws-s3';
export * as awsDynamoDB from './services/aws-dynamodb';

export * as dynamoose from './services/dynamoose';

export * as sentryNode from './sentry/sentry-node';

import sentryNode from './sentry/sentry-node';
import sentryServerless from './sentry/sentry-serverless';

export { sentryServerless, sentryNode };
