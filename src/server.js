'use strict';

import slsHttp from 'serverless-http';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import configs from '../configs';
import routers from './routers';

const server = express();

server.use(cors());
server.use(morgan('combined'));
server.use(json({ limit: '50mb' }));
server.use(urlencoded({ limit: '50mb', extended: true }));

/**
 * Routers
 */
server.use(routers);

/**
 * Not found
 */
server.use((req, res, next) => {
  return res.status(404).send({
    error: 'Not Found Router'
  });
});

const APP_PORT = configs.port;

/**
 * Listening
 */
server.listen(APP_PORT, (err) => {
  if (err) {
    console.log('Error', err);
  }
  console.log(`App running on port ${APP_PORT}`);
});

export default slsHttp(server);
