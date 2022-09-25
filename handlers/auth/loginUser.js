'use strict';

const { aws } = require('../../src/services');

module.exports = async (event, context, callback) => {
  console.log('🚀 ~ file: loginUser.js ~ line 6 ~ module.exports.handler= ~ event', event);
  callback(null, { msg: 'Login user' });
};
