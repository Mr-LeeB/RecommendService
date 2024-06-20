'use strict';

import { Request, Response } from 'express';
import RecommendService from '~/services/recommend.service';

class RecommendController {
  static async recommendPosts(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const result = await RecommendService.recommendPosts(userID);
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

  static async recommendUsers(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const result = await RecommendService.recommendUsers(userID);
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
