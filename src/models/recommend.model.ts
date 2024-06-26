'use strict';

import { model, Schema, Types } from 'mongoose';
import './user.model';
const ObjectId = Types.ObjectId;

const DOCUMENT_NAME = 'Recommend';
const COLLECTION_NAME = 'recommends';

const recommendSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    recommends: {
      communities: [
        {
          community: { type: ObjectId, ref: 'Community' },
          score: { type: Number, default: 0 }
        }
      ],
      users: [
        {
          user: { type: ObjectId, ref: 'User' },
          score: { type: Number, default: 0 }
        }
      ],
      posts: [
        {
          post: { type: ObjectId, ref: 'Post' },
          score: { type: Number, default: 0 }
        }
      ]
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

recommendSchema.index({ user: 1 }, { unique: true });
recommendSchema.index({ 'recommends.communities.community': 1 });
recommendSchema.index({ 'recommends.users.user': 1 });
recommendSchema.index({ 'recommends.posts.post': 1 });

const RecommendModel = model(DOCUMENT_NAME, recommendSchema);

interface Recommend {
  recommends: {
    communities: { community: string; score: number }[];
    users: { user: string; score: number }[];
    posts: { post: string; score: number }[];
  };
}

class RecommendClass {
  static async getRecommendByUserId(userId: string) {
    return await RecommendModel.findOne({ user: userId });
  }

  static async createRecommend(userId: string) {
    return await RecommendModel.create({ user: userId });
  }

  static async updateRecommend(userId: string, recommends: Recommend) {
    return await RecommendModel.updateOne({ user: userId }, { recommends });
  }
}

export { RecommendModel, RecommendClass };
