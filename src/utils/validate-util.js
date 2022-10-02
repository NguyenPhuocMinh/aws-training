'use strict';

import { isEmpty } from 'lodash';

export const handleValidate = (data) => {
  let isValid = true;

  const { email, password } = JSON.parse(data);

  if (isEmpty(email) || isEmpty(password) || password.length < 6) {
    isValid = false;
  }

  return isValid;
};

export const handleValidateUploadImage = (data) => {
  let isValid = true;

  const { image } = JSON.parse(data);

  if (isEmpty(image)) {
    isValid = false;
  }

  return isValid;
};
