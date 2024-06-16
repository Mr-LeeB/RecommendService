'use strict';

import { Router } from 'express';
const router = Router();

import recommendRouter from './recommend.route';

router.use('/recommends', recommendRouter);

export default router;
