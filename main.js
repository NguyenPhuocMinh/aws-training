'use strict';

const slsHttp = require('serverless-http');
const server = require('./src/server');

const handler = slsHttp(server);

module.exports.restApi = handler;

const { loginUser, registerUser } = require('./handlers');

module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
