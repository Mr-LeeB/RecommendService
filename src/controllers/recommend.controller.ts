'use strict';

import { Request, Response } from 'express';
import RecommendService from '~/services/recommend.service';

class RecommendController {
  static async getRecommend(req: Request, res: Response) {}

  static async recommendUSer(req: Request, res: Response) {
    try {
      const { userID } = req.params;

      const result = await RecommendService.recommendUSer(userID);

      return res.status(200).json({
        status: 200,
        message: 'Recommendation success',
        data: result
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message || 'Internal Server Error'
      });
    }
  }
}

export default RecommendController;
