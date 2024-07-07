import { PostClass } from '../models/post.model';

class PostService {
  static async getPosts() {
    return await PostClass.getAllPosts();
  }
}

export default PostService;
