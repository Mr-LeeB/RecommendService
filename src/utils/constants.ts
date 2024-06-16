const RoleUser = {
  USER: '0000',
  ADMIN: '0101'
};

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-rtoken-id',
  GITHUB_TOKEN: 'x-github-token'
};

const avt_default = 'default_avatar.png';

const pp_UserDefault = '_id name email user_image last_online';
const pp_UserMore = '_id name email user_image last_online experiences';
const se_UserDefault = ['_id', 'name', 'email', 'user_image', 'last_online'];
const se_UserAdmin = ['_id', 'name', 'email', 'user_image', 'experiences', 'tags', 'post_number'];

const se_UserDefaultForPost = ['_id', 'name', 'email', 'user_image', 'experiences', 'post_number', 'last_online'];

const unSe_PostDefault = [
  'post_attributes.likes',
  'post_attributes.shares',
  'post_attributes.saves',
  'post_attributes.views',
  'post_attributes.comments',
  'updatedAt',
  '__v'
];

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;
const objectConnectRedis = {
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  host: REDIS_HOST,
  port: REDIS_PORT
};

const VoteType = {
  Comment: 1,
  Answer: 1.5,
  Question: 2
};

export {
  HEADER,
  RoleUser,
  avt_default,
  se_UserDefault,
  se_UserAdmin,
  pp_UserDefault,
  pp_UserMore,
  se_UserDefaultForPost,
  objectConnectRedis,
  unSe_PostDefault,
  VoteType
};
