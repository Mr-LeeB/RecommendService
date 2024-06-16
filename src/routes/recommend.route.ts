'use strict';
import { Router } from 'express';
const router = Router();

import RecommendController from '~/controllers/recommend.controller';

router.get('/', RecommendController.getRecommend);
router.get('/users/:userID', RecommendController.recommendUSer);

export default router;
