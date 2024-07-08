import { model, Schema, Types } from 'mongoose';
import { se_UserDefault, pp_UserDefault } from '../utils/constants.js';
import { getSelectData } from '../utils/functions.js';
import { ICommunity } from '../utils/type.js';

const ObjectId = Schema.Types.ObjectId;

const DOCUMENT_NAME = 'Community';
const COLLECTION_NAME = 'communities';

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    creator: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    image: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    rules: {
      type: [{ title: String, content: String }]
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'member', 'friend'],
      default: 'public'
    },

    // =========================================

    posts: {
      type: [{ type: ObjectId, ref: 'Post' }],
      default: []
    },
    members: {
      type: [{ type: ObjectId, ref: 'User' }],
      required: true
    },
    recently_joined: {
      type: [{ type: ObjectId, ref: 'User' }],
      default: []
    },
    admins: {
      type: [{ type: ObjectId, ref: 'User' }],
      required: true,
      select: false
    },
    waitlist_users: {
      type: [{ type: ObjectId, ref: 'User' }],
      default: [],
      select: false
    },
    waitlist_posts: {
      type: [{ type: ObjectId, ref: 'Post' }],
      default: [],
      select: false
    }

    // Number
    // post_number: { type: Number, default: 0 },
    // member_number: { type: Number, default: 0 },
    // admin_number: { type: Number, default: 0 },
    // waitlist_user_number: { type: Number, default: 0 },
    // waitlist_post_number: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

const CommunityModel = model(DOCUMENT_NAME, CommunitySchema);

class CommunityClass {
  static async getAllCommunities(): Promise<ICommunity[]> {
    return await CommunityModel.find()
      .select('+admins +waitlist_users +waitlist_posts')
      .populate('members')
      .populate('waitlist_users')
      .lean();
  }

  // type = ['member', 'post', 'follow', 'admin', 'waitlist_user', 'waitlist_post']
  // number = 1 or -1
  static async changeToArrayCommunity(community_id: string, type: string, itemID: string, number: number) {
    const stringUpdateArr = type + 's';
    const stringUpdateNum = type + '_number';
    const operator = number === 1 ? '$addToSet' : '$pull';

    return await CommunityModel.findByIdAndUpdate(
      community_id,
      {
        [operator]: { [stringUpdateArr]: itemID },
        $inc: { [stringUpdateNum]: number }
      },
      { new: true }
    ).lean();
  }

  static async checkExist(select: string[]) {
    return await CommunityModel.findOne(select)
      .select('+admins +waitlist_users')
      .populate('members')
      .populate('waitlist_users')
      .lean();
  }

  static async getCommunitiesByUserID(user_id: string): Promise<ICommunity[]> {
    return await CommunityModel.find({ members: user_id })
      .select('+admins +waitlist_users')
      .populate('members')
      .populate('waitlist_users')
      .lean();
  }
}

export { CommunityModel, CommunityClass };
