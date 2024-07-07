import { Post, UserInteraction } from './../utils/type';
import { UserClass } from '~/models/user.model';
import { IUserRecommended } from '~/utils/type';
import PostService from './post.service';
import { FriendClass } from '~/models/friend.model';

class UserService {
  static async getAllUsers(userId: string) {
    const users = await UserClass.getAllUsers();
    const friends = await FriendClass.getAllFriends(userId);
    const listRecommendUsers = users.filter((user) => !friends.includes(user._id));

    const result: IUserRecommended[] = [];

    listRecommendUsers.forEach((user) => {
      result.push({
        _id: user._id.toString(),
        id_incr: user.id_incr as number,
        name: user.name as string,
        email: user.email as string,
        role: user.role as string[],
        phone_number: (user.phone_number as string) || '',
        user_image: user.user_image as string,
        cover_image: user.cover_image as string,
        tags: user.tags as string[],
        alias: user.alias as string,
        about: user.about as string,
        level: user.level as number,
        location: user.location as string,
        createdAt: user.createdAt.toString()
      });
    });

    return result;
  }

  static async getUserInteractionsAndPosts() {
    const posts = await PostService.getPosts();
    const userInteractions: UserInteraction[] = [];
    const allPosts: Post[] = [];
    posts.forEach((post) => {
      allPosts.push({
        post_id: post._id.toString(),
        content: post.post_attributes.content,
        tags: post.post_attributes.tags || []
      });
      if (post.post_attributes.likes.length) {
        post.post_attributes.likes.forEach((userId) => {
          userInteractions.push({
            user_id: userId.toString(),
            post_id: post._id.toString(),
            interaction: 'like',
            timestamp: post.createdAt.getTime()
          });
        });
      }
      if (post.post_attributes.comments.length) {
        post.post_attributes.comments.forEach((userId) => {
          userInteractions.push({
            user_id: userId.toString(),
            post_id: post._id.toString(),
            interaction: 'comment',
            timestamp: post.createdAt.getTime()
          });
        });
      }
      if (post.post_attributes.shares.length) {
        post.post_attributes.shares.forEach((userId) => {
          userInteractions.push({
            user_id: userId.toString(),
            post_id: post._id.toString(),
            interaction: 'share',
            timestamp: post.createdAt.getTime()
          });
        });
      }
    });

    return {
      userInteractions: userInteractions,
      posts: allPosts
    };
  }
}

export default UserService;
