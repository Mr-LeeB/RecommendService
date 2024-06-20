import { Post, UserInteraction } from './../utils/type';
import { UserClass } from '~/models/user.model';
import { User } from '~/utils/type';
import PostService from './post.service';

class UserService {
  static async getAllUsers() {
    const users = await UserClass.getAllUsers();

    const result: User[] = [];
    users.forEach((user) => {
      result.push({
        id: user._id.toString(),
        tags: (user.tags as string[]) || []
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
