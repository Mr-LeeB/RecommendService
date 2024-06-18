export interface IUserAToken {
  accessToken: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IVerifyCode {
  email: string;
  code: string;
}

export interface IResetPassword {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  phone_number?: string;
  user_image?: string;
  cover_image?: string;
  tags?: string[];
  alias?: string;
  about?: string;
  experiences?: IExperience[];
  repositories?: IRepository[];
  contacts?: IContact[];
  location?: string;
}

export interface IRepository {
  id: string;
  name: string;
  private: boolean;
  html_url: string;
  watchers_count: number;
  forks_count: number;
  stargazers_count: number;
  languages: string;
}

export interface ICreateRepository {
  id: string;
  name: string;
  private: boolean;
  html_url: string;
  watchers_count: number;
  forks_count: number;
  stargazers_count: number;
  language: string;
}

export interface IExperience {
  position_name: string;
  company_name: string;
  start_date: string;
  end_date: string;
}

export type IKeyContact = 'facebook' | 'instagram' | 'twitter' | 'github' | 'linkedin';

export interface IContact {
  key: IKeyContact;
  link: string;
}

export interface IUserInfo {
  id_incr: number;
  name: string;
  email: string;
  role: string[];
  last_online: string;
  phone_number: string;
  user_image: string;
  cover_image: string;
  tags: string[];
  alias: string;
  about: string;
  posts: IPost[];
  reputation: number;
  level: number;
  experiences: IExperience[];
  repositories: IRepository[];
  contacts: IContact[];
  location: string;
  education: string;
  createdAt: string;
  favorites: string[];
  favorite_questions: IQuestion[];
  communities: string[];
  notifications: string[];
  friends: IUserInfo[];
  requestSent: string[];
  requestReceived: string[];
  friend_number: number;
  pendingFriend_number: number;
  members: IUserInfo[];
  post_number: number;
  is_friend: boolean;
}

export interface IReputation {
  reputation: number;
  level: number;
}

export interface TypeOfLink {
  title: string;
  description: string;
  image: string;
}

export interface ICreatePost {
  title: string;
  content: string;
  visibility: Visibility;
  scope?: 'Normal' | 'Community';
  community?: string;
  images?: (string | undefined)[];
  hashtags?: string[];
  rmHashtags?: string[];
}

export interface IUpdatePost {
  id: string;
  postUpdate: ICreatePost;
}

export interface ISharePost {
  post: string;
  visibility?: Visibility;
  owner_post: string;
  content?: string;
  shared_post?: string;
  hashtags?: string[];
}

type TypeofPost = 'Post' | 'Share';

export interface IPost {
  _id: string;
  type: TypeofPost;
  visibility: Visibility;
  post_attributes: {
    user: IUserInfo;

    //if type is post
    title: string;
    content: string;
    images: string[];
    url?: TypeOfLink;

    //if type is share
    post?: IPost;
    owner_post?: IUserInfo;

    likes: ILikePost[];
    comments: ICommentPost[];
    shares: ISharePost[];
    hashtags: string[];

    view_number: number;
    like_number: number;
    comment_number: number;
    share_number: number;
  };
  is_liked: boolean;
  is_shared: boolean;
  is_saved: boolean;
  createdAt: string;
}

export interface ILikePost {
  _id: string;
  user: IUserInfo;
  post: IPost;
  owner_post: IUserInfo;
}

export type TypeofComment = 'parent' | 'child';

export interface ICreateComment {
  type: TypeofComment;
  post: string;
  owner_post: string;
  content: string;
  parent?: string;
  parentUser?: string;
}

export interface IImageResponse {
  key: string;
}

export interface IAllImage {
  post_id: string;
  image: string;
}

export interface ICreateLikeComment {
  id: string;
  comment: ILikeComment;
}

export interface IGetChildComments {
  post: string;
  parent: string;
}

export interface ILikeComment {
  type: TypeofComment;
  post: string;
  owner_comment: string;
}

export interface ICommentPost {
  _id: string;
  post: string;
  user: IUserInfo;
  content: string;
  type: TypeofComment;

  //if interface is child
  parent?: ICommentPost;

  //if interface is parent
  child_number: number;

  is_liked: boolean;
  is_disliked: boolean;
  likes: ILikePost[];
  dislikes: ILikePost[];
  like_number: number;
  dislike_number: number;
  createdAt: string;
}

export interface ISelectedComment {
  isReply: boolean;
  idComment: string | null;
  name: string | null;
  user_image: string | null;
}

export interface IResponse<T> {
  message: string;
  status: number;
  metadata: T;
}

export type TypeofConversation = 'private' | 'group';

export interface IConversation {
  _id: string;
  type: TypeofConversation;
  members: IUserInfo[];
  name: string;
  lastMessage: IMessage;
  creator: string;
  admins: IUserInfo[];
  image?: string;
  cover_image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateConversation {
  type: TypeofConversation;
  members: string[];
  name?: string;
  image?: string;
}

type TypeofUpdateConversation =
  | 'name'
  | 'image'
  | 'cover_image'
  | 'add_member'
  | 'remove_member'
  | 'commission_admin'
  | 'remove_admin';

export interface IUpdateConversation extends IConversation {
  typeUpdate: TypeofUpdateConversation;
}

type TypeofMessage = 'text' | 'image' | 'notification' | 'audio' | 'file' | 'voice' | 'video' | 'post';
type TypeofAction =
  | 'promote_admin'
  | 'revoke_admin'
  | 'remove_member'
  | 'change_name'
  | 'change_avatar'
  | 'leave_conversation'
  | 'add_member';

export interface IMessage {
  _id: string;
  conversation_id: string;
  type: TypeofMessage;
  sender: IUserInfo;
  seen: IUserInfo[];
  content: string;
  post_id?: string;
  action: TypeofAction;
  target?: IUserInfo;
  isSending?: boolean;
  images?: string[];
  createdAt: string;
}

export interface ICreateMessage {
  conversation_id: string;
  content?: string;
  image?: string;
}

export interface ICalled {
  _id: string;
  content: string;
  conversation_id: IConversation;
  sender: IUserInfo;
  seen: IUserInfo[];
  type: TypeofMessage;
  createdAt: string;
}

export interface IEmoji {
  id: string;
  aliases: string[];
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  skin: number;
}

export interface ISocketCall {
  author: IUserInfo;
  user_id: string;
  user_name: string;
  user_image: string;
  members: IUserInfo[];
  token: string;
  first_call: boolean;
  type: 'missed' | 'ended';
  typeofConversation: TypeofConversation;
  conversation_id: string;
  conversation_name: string;
}

export type Visibility = 'public' | 'private' | 'member' | 'friend';

export interface ICreateCommunity {
  name: string;
  about: string;
  tags: string[];
  image: string;
  members: string[];
  rules: {
    title: string;
    content: string;
  }[];
  visibility: Visibility;
}

export interface IUpdateCommunity {
  id: string;
  name?: string;
  about?: string;
  tags?: string[];
  image?: string;
  members?: string[];
  admins?: string[];
  rules?: {
    title?: string;
    content?: string;
  }[];
  visibility?: Visibility;
  scope: 'Community';
}

export interface ICommunity {
  _id: string;
  name: string;
  image: string;
  about: string;
  tags: string[];
  rules: {
    title: string;
    content: string;
  }[];
  visibility: Visibility;
  creator: IUserInfo;
  author: IUserInfo;
  posts: IPost[];
  members: IUserInfo[];
  recently_joined: IUserInfo[];
  admins: IUserInfo[];
  waitlist_users: IUserInfo[];
  waitlist_posts: IPost[];
  post_number: number;
  member_number: number;
  admin_number: number;
  waitlist_user_number: number;
  waitlist_post_number: number;
  createdAt: string;
}

export interface INotification {
  _id: string;
  type: string;
  sender: IUserInfo;
  receiver: IUserInfo;
  content: string;
  createAt: string;
  options: {
    post: string;
    comment: string;
    conversation: string;
    community: string;
  };
  is_viewed: boolean;
}

export interface ICreateSearchLog {
  user: string;
  keyword?: string;
  recently_search?: string;
}

export interface ISearchLog {
  _id: string;
  user: string;
  keywords: string[];
  recently_search_list: IUserInfo[];
  createdAt: string;
}

export type IFeaturePost =
  | 'detail'
  | 'sharing'
  | 'newsfeed'
  | 'modal'
  | 'profile'
  | 'favorite'
  | 'requested'
  | 'community';

// Series

export type TypeOfLevel = 'beginner' | 'intermediate' | 'advanced';

export interface ICreateSeries {
  title: string;
  description: string;
  level: TypeOfLevel;
  cover_image: string;
  introduction: string;
  visibility: Visibility;
}

export interface IUpdateSeries {
  id: string;
  title: string;
  description: string;
  level: TypeOfLevel;
  cover_image: string;
  introduction: string;
  visibility: Visibility;
}

export interface ICreateSeriesPost {
  series_id: string;
  title: string;
  description: string;
  cover_image: string;
  content: string;
  read_time: number;
  visibility: Visibility;
}

export interface IUpdateSeriesPost {
  id: string;
  series_id: string;
  title: string;
  description: string;
  cover_image: string;
  content: string;
  read_time: number;
  visibility: Visibility;
}

export interface IDeleteSeriesPost {
  id: string;
  series_id: string;
}

export interface ICreateReviewSeries {
  series_id: string;
  content: string;
  rating: number;
}

export interface IDeleteReviewSeries {
  series_id: string;
  review_id: string;
}

export interface IReview {
  _id: string;
  user: IUserInfo;
  content: string;
  rating: number;
  createdAt: string;
}

export interface ICreateCommentSeriesPost {
  series_id: string;
  post_id: string;
  content: string;
}

export interface IUpdateCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
  content: string;
}

export interface IDeleteCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
}

export interface ICreateReplyCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
  content: string;
}

export interface IUpdateReplyCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
  content: string;
  child_id: string;
}

export interface IDeleteReplyCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
  child_id: string;
}

export interface IChildCommentSeriesPost {
  _id: string;
  user: IUserInfo;
  content: string;
  like: IUserInfo[];
  createdAt: string;
  child: IChildCommentSeriesPost[];
}

export interface ICommentSeriesPost {
  _id: string;
  user: IUserInfo;
  content: string;
  like: IUserInfo[];
  createdAt: string;
  child: IChildCommentSeriesPost[];
}

export interface ILikeCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
}

export interface ILikeReplyCommentSeriesPost {
  series_id: string;
  post_id: string;
  comment_id: string;
  child_id: string;
}

export interface ILikeSeriesPost {
  series_id: string;
  post_id: string;
}

export interface ISaveSeriesPost {
  series_id: string;
  post_id: string;
}

export interface ISeriesPost {
  _id: string;
  title: string;
  content: string;
  cover_image: string;
  description: string;
  read_time: number;
  likes: IUserInfo[];
  saves: IUserInfo[];
  comments: ICommentSeriesPost[];
  visibility: Visibility;
  createdAt: string;
}

export interface ISeries {
  _id: string;
  user: IUserInfo;
  title: string;
  description: string;
  introduction: string;
  visibility: Visibility;
  posts: ISeriesPost[];
  cover_image: string;
  level: TypeOfLevel;
  rating: {
    star_1: number;
    star_2: number;
    star_3: number;
    star_4: number;
    star_5: number;
    avg: number;
  };
  reviews: IReview[];
  view: number;
  createdAt: string;
}

// Question

export interface ICommentQuestion {
  _id: string;
  user: IUserInfo;
  content: string;
  vote: string[];
  createdAt: string;
}

export interface IAnswerQuestion {
  _id: string;
  user: IUserInfo;
  content: string;
  like: IUserInfo[];
  vote_up: string[];
  vote_down: string[];
  vote_score: number;
  comment: ICommentQuestion[];
  createdAt: string;
  update_at: string;
}

export interface IQuestion {
  _id: string;
  user: IUserInfo;
  title: string;
  problem: string;
  expect: string;
  text: string;
  hashtags: string[];
  view: number;
  vote_up: string[];
  vote_down: string[];
  vote_score: number;
  answers: IAnswerQuestion[];
  saves: string[];
  comment: ICommentQuestion[];
  createdAt: string;
  update_at: string;
}

export interface IQuestionSummaryItem {
  _id: string;
  title: string;
  problem: string;
  hashtags: string[];
  text: string;
  user: { _id: string; name: string; user_image: string };
  vote_score: number;
  view: number;
  answer_number: number;
  createdAt: string;
}

export interface IAllTagQuestionItem {
  _id: string;
  name: string;
  question_number: number;
  number_today: number;
  number_this_week: number;
}

export interface ICreateQuestion {
  title: string;
  problem: string;
  expect: string;
  text: string;
  hashtags: string[];
}

export interface IUpdateQuestion {
  id: string;
  title: string;
  problem: string;
  expect: string;
  text: string;
  hashtags: string[];
}

export interface ICreateVoteQuestion {
  question_id: string;
  type: string;
  old: string;
}

export interface IHashtag {
  _id: string;
  name: string;
  posts: IPost[];
  communities: IPost[];
  questions: IQuestion[];
}

export interface ICreateCommentQuestion {
  question_id: string;
  content: string;
}

export interface IUpdateCommentQuestion {
  question_id: string;
  answer_id?: string;
  comment_id: string;
  content: string;
}

export interface IDeleteCommentQuestion {
  question_id: string;
  answer_id?: string;
  comment_id: string;
}

export interface ICommentVoteQuestion {
  question_id: string;
  answer_id?: string;
  comment_id: string;
}

export interface ICreateAnswerQuestion {
  question_id: string;
  content: string;
}

export interface IUpdateAnswer {
  question_id: string;
  answer_id: string;
  content: string;
}

export interface IDeleteAnswer {
  question_id: string;
  answer_id: string;
}

export interface ICreateCommentAnswer {
  question_id: string;
  answer_id: string;
  content: string;
}

export interface ICreateVoteAnswer {
  question_id: string;
  answer_id: string;
  old: string;
  type: string;
}

export interface IAllListQuestion {
  list_name: string[];
  list_category: [
    {
      name: string;
      questions: IQuestionSummaryItem[];
    }
  ];
}

export interface IMoveToListQuestion {
  question_id: string;
  from: string;
  to: string;
}

export interface IRemoveFromListQuestion {
  question_id: string;
  from: string;
}

export interface IUpdateNameListQuestion {
  old_name: string;
  new_name: string;
}