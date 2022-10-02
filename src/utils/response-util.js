'use strict';

const handleResponse = (status, context) => {
  return {
    statusCode: status,
    body: JSON.stringify(context),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
};

export default handleResponse;
