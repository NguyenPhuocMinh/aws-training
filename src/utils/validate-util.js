'use strict';

const { isEmpty } = require('lodash');

const handleValidate = (data) => {
  const { email, password } = data;

  if (isEmpty(email) || isEmpty(password) || password.length < 6) {
    return false;
  }
  return true;
};

module.exports = handleValidate;
