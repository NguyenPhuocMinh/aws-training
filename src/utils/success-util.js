"use strict";

const handleSuccess = (res, data = {}) => {
  res.status(200).send(data);
};

export default handleSuccess;
