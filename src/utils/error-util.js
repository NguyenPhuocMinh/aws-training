"use strict";

const handleError = (res, err) => {
  res.status(err.statusCode).send({
    msg: err.message,
    code: err.code,
    requestId: err.requestId,
  });
};

module.exports = handleError;
