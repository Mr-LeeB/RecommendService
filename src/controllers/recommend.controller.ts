'use strict';

import { Request, Response } from 'express';
import RecommendService from '../services/recommend.service';
import { OK } from '../core/success.response';

class RecommendController {
  static async recommendPosts(req: Request, res: Response) {
    new OK({
      message: 'Recommend Posts Successfully',
      metadata: await RecommendService.recommendPosts(req.params.userID)
    }).send(res);
  }

  static async recommendUsers(req: Request, res: Response) {
    new OK({
      message: 'Recommend Users Successfully',
      metadata: await RecommendService.recommendUsers(req.params.userID)
    }).send(res);
  }

  static async recommendCommunities(req: Request, res: Response) {
    new OK({
      message: 'Recommend Communities Successfully',
      metadata: await RecommendService.recommendCommunities(req.params.userID)
    }).send(res);
  }
}

export default RecommendController;
