"use strict";

const homeRouter = require("./home-router");
const userRouter = require("./user-router");
const uploadRouter = require("./upload-router");

module.exports = [homeRouter, userRouter, uploadRouter];
