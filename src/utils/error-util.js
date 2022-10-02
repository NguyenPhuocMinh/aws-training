"use strict";

const handleError = (res, err) => {
  res.status(err.statusCode || 500).send({
    msg: err.message,
    code: err.code,
    requestId: err.requestId,
  });
};

export default handleError;
