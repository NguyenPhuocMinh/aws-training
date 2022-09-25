## Learn Aws Lambda function With Api Express, DynamoDB, S3 With Serverless Nodejs

### Init project

```sh
$ npm init -y
```

### Structure

```sh
.
├── README.md
├── configs.js
├── main.js
├── package-lock.json
├── package.json
├── serverless.yml
├── src
│   ├── models
│   │   └── index.js
│   ├── routers
│   │   ├── home-router.js
│   │   ├── index.js
│   │   ├── upload-router.js
│   │   └── user-router.js
│   ├── schemas
│   │   └── index.js
│   ├── server.js
│   ├── services
│   │   ├── aws
│   │   │   ├── dynamoDB.js
│   │   │   ├── index.js
│   │   │   ├── route53.js
│   │   │   └── s3.js
│   │   ├── dynamoose
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── multer
│   │       └── index.js
│   └── utils
│       ├── error-util.js
│       ├── index.js
│       └── success-util.js
```

### Setup Env

- npm i -g serverless
- serverless create --template aws-nodejs --path folder-name
- serverless config credentials \
  --provider aws \
  --key AWS_ACCESS_KEY \
  --secret AWS_SECRET_KEY
- aws configure (aws cli)
- aws configure list => see inform aws

### .env file

- APP_AWS_STAGE=\*\*\*\*
- APP_AWS_REGION=\*\*\*\*
- APP_AWS_BUCKET_S3=\*\*\*\*
- APP_AWS_DYNAMODB_USER_TABLE=\*\*\*\*

### Use

- sls deploy => deploy app to aws
- sls invoke -f api => invoking functions locally and remotely
- sls logs -f function name -t => tailing the logs

```sh
  - deploy dev => npm run deploy:dev
```

### Curl

```sh
curl https://**********.amazonaws.com
```

### 1. Lambda Function

### 2. Cognito

- document syntax: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html

### 2. DynamoDB With Dynamoose

### 3. S3
