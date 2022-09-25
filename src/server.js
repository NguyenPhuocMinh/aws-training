"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const routers = require("./routers");

const server = express();

server.use(cors());
server.use(morgan("combined"));
server.use(bodyParser.json({ limit: "50mb" }));
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
server.use(express.static(__dirname + "/public"));

/**
 * Routers
 */
server.use(routers);

/**
 * Not found
 */
server.use((req, res, next) => {
  return res.status(404).send({
    error: "Not Found Router",
  });
});

const configs = require("../configs");
const APP_PORT = configs.port;

/**
 * Listening
 */
server.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});

module.exports = server;
