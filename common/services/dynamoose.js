'use strict';

import dynamoose, { aws } from 'dynamoose';
import configs from '../../configs';

const ddb = new aws.ddb.DynamoDB({
  accessKeyId: configs.awsAccessKey,
  secretAccessKey: configs.awsSecretKey,
  region: configs.awsRegion
});

aws.ddb.set(ddb);

export default dynamoose;
