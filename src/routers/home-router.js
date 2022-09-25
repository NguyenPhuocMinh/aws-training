"use strict";

const homeRouter = require("express").Router();

homeRouter.get("/", (req, res) => {
  res.send({
    message: "Hello Aws Lambda Function",
  });
});

module.exports = homeRouter;
