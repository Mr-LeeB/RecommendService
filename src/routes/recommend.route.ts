'use strict';
import { Router } from 'express';
import RecommendController from '../controllers/recommend.controller';
const router = Router();

// router.get('/', RecommendController.getRecommend);
router.get('/users/:userID', RecommendController.recommendUsers);
router.get('/posts/:userID', RecommendController.recommendPosts);
router.get('/communities/:userID', RecommendController.recommendCommunities);

export default router;
