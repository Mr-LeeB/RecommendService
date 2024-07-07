'use strict';
import { model, Schema } from 'mongoose';
import { getSelectData, convertToObjectIDMongoDB } from '../utils/functions';
import { se_UserDefault } from '../utils/constants';

const ObjectId = Schema.Types.ObjectId;

const DOCUMENT_NAME = 'Friend';
const COLLECTION_NAME = 'friends';

const FriendSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      index: true,
      required: true
    },
    friends: {
      type: [ObjectId],
      ref: 'User',
      index: true,
      default: []
    },
    requestsSent: {
      type: [ObjectId],
      ref: 'User',
      default: []
    },
    requestsReceived: {
      type: [ObjectId],
      ref: 'User',
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

FriendSchema.index({ user: 1, friend: 1 }, { unique: true });

const FriendModel = model(DOCUMENT_NAME, FriendSchema);
class FriendClass {
  static async getAllFriends(user_id: string) {
    const user = await FriendModel.findOne({ user: user_id }).select('friends');
    if (!user) return [];
    return user.friends;
  }

  static async getRequestsSent(user_id: string) {
    const user = await FriendModel.findOne({ user: user_id });
    if (!user) return [];

    return user.requestsSent;
  }
  static async getRequestsReceived(user_id: string) {
    const user = await FriendModel.findOne({ user: user_id });
    if (!user) return [];

    return user.requestsReceived;
  }
  static async isFriend(user_id: string, friend_id: string) {
    const user = await FriendModel.findOne({ user: user_id });
    if (!user) return false;

    return user.friends.includes(convertToObjectIDMongoDB(friend_id));
  }
}

export { FriendModel, FriendClass };
