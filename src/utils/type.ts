import { ObjectId } from 'mongoose';

export interface User {
  id: string;
  tags: string[];
}

export interface Post {
  post_id: string;
  content: string;
  tags: string[];
}

export interface UserInteraction {
  user_id: string;
  post_id: string;
  interaction: string;
  timestamp: number; // Thêm thời gian tương tác
}
type TypeofPost = 'Post' | 'Share';
export type Visibility = 'public' | 'private' | 'member' | 'friend';

export interface IPost {
  _id: ObjectId;
  type: TypeofPost;
  visibility: Visibility;
  post_attributes: {
    user: ObjectId;

    //if type is post
    title: string;
    content: string;
    images: string[];
    url?: TypeOfLink;

    //if type is share
    post?: IPost;
    owner_post?: ObjectId;

    likes: ObjectId[];
    comments: ObjectId[];
    shares: ObjectId[];
    hashtags: string[];
    tags: string[];

    view_number: number;
    like_number: number;
    comment_number: number;
    share_number: number;
  };
  createdAt: Date;
}

export interface TypeOfLink {
  title: string;
  description: string;
  image: string;
}
