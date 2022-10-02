'use strict';

import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
  res.send({
    message: 'Hello Aws Lambda Function'
  });
});

export default homeRouter;
