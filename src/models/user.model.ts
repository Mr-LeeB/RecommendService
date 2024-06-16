'use strict';

import { model, Schema, Types } from 'mongoose';
import { avt_default } from '../utils/constants';
const ObjectId = Types.ObjectId;

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const UserSchema = new Schema(
  {
    id_incr: { type: Number, default: 0, index: true },
    name: {
      type: String,
      trim: true,
      maxLength: 150,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    password: { type: String },
    role: Array,
    last_online: { type: Date, default: Date.now },
    reputation: { type: Number, default: 0 },
    level: { type: Number, default: 1 },

    // ==================================================

    phone_number: Number,
    user_image: { type: String, default: avt_default },
    cover_image: String,
    verified: { type: Boolean, default: false },
    tags: [{ type: String }],
    alias: { type: String, trim: true, default: '' },
    about: String,
    post_series: { type: Array, default: [] },
    /*
      {
        series_id: ObjectId,
        post_id: ObjectId
      }
    */
    experiences: { type: Array, default: [] },
    /* 
      {
        positionName: String,
        companyName: String,
        startDate: String,
        endDate: String
      }
    */
    repositories: { type: Array, default: [] },
    /* 
    {
        id: Number,
        name: String,
        private: Boolean,
        url: String,
        watchersCount: Number,
        forksCount: Number,
        stargazersCount: Number,
        languages: String
      }
    */
    contacts: { type: Array, default: [] },
    location: String,
    favorites: {
      type: [{ type: ObjectId, ref: 'Post' }],
      default: []
    },
    favorite_questions: {
      type: [{ type: ObjectId, ref: 'Question' }],
      default: []
    },
    communities: {
      type: [{ type: ObjectId, ref: 'Community' }],
      default: []
    },
    notifications: {
      type: [{ type: ObjectId, ref: 'Notification' }],
      default: []
    },

    // Number
    post_number: { type: Number, default: 0 },
    community_number: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

// create index for search
UserSchema.index({ name: 'text', email: 'text', alias: 'text' });

// lv1   0
// lv2   50
// lv3   150
// lv4   250
// lv5   400

const UserModel = model(DOCUMENT_NAME, UserSchema);
class UserClass {
  static async getAllUsers() {
    return await UserModel.find();
  }

  static async getUserById(userId: string) {
    return UserModel.findById(userId);
  }
}

//Export the model
export { UserClass, UserModel };
