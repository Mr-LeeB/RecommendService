'use strict';

import { Request, Response } from 'express';
import { OK } from '~/core/success.response';
import RecommendService from '~/services/recommend.service';

class RecommendController {
  static async recommendPosts(req: Request, res: Response) {
    new OK({
      message: 'Get All Hashtags Successfully',
      metadata: await RecommendService.recommendPosts(req.params.userID)
    }).send(res);
  }

  static async recommendUsers(req: Request, res: Response) {
    new OK({
      message: 'Get All Hashtags Successfully',
      metadata: await RecommendService.recommendUsers(req.params.userID)
    }).send(res);
  }
}

export default RecommendController;
