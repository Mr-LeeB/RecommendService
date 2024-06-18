'use strict';

import { Request, Response } from 'express';
import RecommendService from '~/services/recommend.service';
import { Post, UserInteraction } from '~/utils/type';

const posts: Post[] = [
  { post_id: '1', title: 'Introduction to TypeScript', tags: ['typescript', 'javascript', 'programming'] },
  { post_id: '2', title: 'Advanced JavaScript Concepts', tags: ['javascript', 'es6', 'programming'] },
  { post_id: '3', title: 'Understanding React Hooks', tags: ['react', 'javascript', 'hooks'] },
  { post_id: '4', title: 'Node.js for Beginners', tags: ['nodejs', 'javascript', 'backend'] },
  { post_id: '5', title: 'Building REST APIs with Express', tags: ['express', 'nodejs', 'api'] },
  { post_id: '6', title: 'CSS Grid Layout', tags: ['css', 'web design', 'frontend'] },
  { post_id: '7', title: 'Mastering Flexbox', tags: ['css', 'flexbox', 'web design'] },
  { post_id: '8', title: 'Introduction to GraphQL', tags: ['graphql', 'api', 'backend'] },
  { post_id: '9', title: 'Getting Started with Docker', tags: ['docker', 'devops', 'containers'] },
  { post_id: '10', title: 'Kubernetes Basics', tags: ['kubernetes', 'devops', 'containers'] },
  { post_id: '11', title: 'Python for Data Science', tags: ['python', 'data science', 'machine learning'] },
  { post_id: '12', title: 'Machine Learning with Python', tags: ['python', 'machine learning', 'data science'] },
  { post_id: '13', title: 'Deep Learning Fundamentals', tags: ['deep learning', 'machine learning', 'ai'] },
  { post_id: '14', title: 'Introduction to Cybersecurity', tags: ['cybersecurity', 'security', 'networking'] },
  { post_id: '15', title: 'Ethical Hacking Basics', tags: ['ethical hacking', 'security', 'cybersecurity'] },
  { post_id: '16', title: 'Blockchain Technology Explained', tags: ['blockchain', 'cryptocurrency', 'technology'] },
  { post_id: '17', title: 'Building Smart Contracts', tags: ['blockchain', 'smart contracts', 'ethereum'] },
  { post_id: '18', title: 'Introduction to Cloud Computing', tags: ['cloud computing', 'aws', 'azure'] },
  { post_id: '19', title: 'AWS for Beginners', tags: ['aws', 'cloud computing', 'devops'] },
  { post_id: '20', title: 'Azure Fundamentals', tags: ['azure', 'cloud computing', 'devops'] },
  { post_id: '21', title: 'Introduction to SQL', tags: ['sql', 'database', 'programming'] },
  { post_id: '22', title: 'NoSQL Databases Explained', tags: ['nosql', 'database', 'programming'] },
  { post_id: '23', title: 'Introduction to MongoDB', tags: ['mongodb', 'nosql', 'database'] },
  { post_id: '24', title: 'Building REST APIs with Django', tags: ['django', 'python', 'api'] },
  { post_id: '25', title: 'Introduction to Flask', tags: ['flask', 'python', 'web development'] },
  { post_id: '26', title: 'Understanding Redux', tags: ['redux', 'react', 'javascript'] },
  { post_id: '27', title: 'Vue.js for Beginners', tags: ['vue', 'javascript', 'frontend'] },
  { post_id: '28', title: 'Svelte Basics', tags: ['svelte', 'javascript', 'frontend'] },
  { post_id: '29', title: 'Introduction to WebAssembly', tags: ['webassembly', 'programming', 'web development'] },
  { post_id: '30', title: 'Rust for Beginners', tags: ['rust', 'programming', 'systems programming'] },
  { post_id: '31', title: 'Go Programming Language', tags: ['go', 'programming', 'backend'] },
  { post_id: '32', title: 'Introduction to Kotlin', tags: ['kotlin', 'programming', 'android'] },
  { post_id: '33', title: 'Swift for iOS Development', tags: ['swift', 'ios', 'programming'] },
  { post_id: '34', title: 'Introduction to Dart', tags: ['dart', 'programming', 'flutter'] },
  { post_id: '35', title: 'Flutter for Mobile Development', tags: ['flutter', 'mobile development', 'dart'] },
  { post_id: '36', title: 'Introduction to TensorFlow', tags: ['tensorflow', 'machine learning', 'python'] },
  { post_id: '37', title: 'PyTorch Basics', tags: ['pytorch', 'machine learning', 'python'] },
  { post_id: '38', title: 'Introduction to Natural Language Processing', tags: ['nlp', 'machine learning', 'python'] },
  { post_id: '39', title: 'Computer Vision with OpenCV', tags: ['opencv', 'computer vision', 'python'] },
  {
    post_id: '40',
    title: 'Introduction to Reinforcement Learning',
    tags: ['reinforcement learning', 'machine learning', 'python']
  },
  { post_id: '41', title: 'Data Visualization with D3.js', tags: ['d3', 'javascript', 'data visualization'] },
  { post_id: '42', title: 'Introduction to WebSockets', tags: ['websockets', 'javascript', 'web development'] },
  { post_id: '43', title: 'Building Real-Time Applications', tags: ['real-time', 'web development', 'javascript'] },
  { post_id: '44', title: 'Introduction to Microservices', tags: ['microservices', 'architecture', 'backend'] },
  { post_id: '45', title: 'Event-Driven Architecture', tags: ['event-driven', 'architecture', 'backend'] },
  { post_id: '46', title: 'Introduction to Serverless Computing', tags: ['serverless', 'cloud computing', 'aws'] },
  { post_id: '47', title: 'Building Applications with Firebase', tags: ['firebase', 'backend', 'javascript'] },
  { post_id: '48', title: 'Introduction to DevOps', tags: ['devops', 'ci/cd', 'automation'] },
  { post_id: '49', title: 'Continuous Integration with Jenkins', tags: ['jenkins', 'ci/cd', 'devops'] },
  { post_id: '50', title: 'Introduction to Ansible', tags: ['ansible', 'automation', 'devops'] }
];

const userInteractions: UserInteraction[] = [
  { user_id: '1', post_id: '1', interaction: 'like', timestamp: 1622548800 },
  { user_id: '1', post_id: '2', interaction: 'comment', timestamp: 1622635200 },
  { user_id: '2', post_id: '3', interaction: 'share', timestamp: 1622721600 },
  { user_id: '2', post_id: '4', interaction: 'like', timestamp: 1622808000 },
  { user_id: '3', post_id: '5', interaction: 'comment', timestamp: 1622894400 },
  { user_id: '3', post_id: '6', interaction: 'share', timestamp: 1622980800 },
  { user_id: '4', post_id: '7', interaction: 'like', timestamp: 1623067200 },
  { user_id: '4', post_id: '8', interaction: 'comment', timestamp: 1623153600 },
  { user_id: '5', post_id: '9', interaction: 'share', timestamp: 1623240000 },
  { user_id: '5', post_id: '10', interaction: 'like', timestamp: 1623326400 },
  { user_id: '6', post_id: '11', interaction: 'comment', timestamp: 1623412800 },
  { user_id: '6', post_id: '12', interaction: 'share', timestamp: 1623499200 },
  { user_id: '7', post_id: '13', interaction: 'like', timestamp: 1623585600 },
  { user_id: '7', post_id: '14', interaction: 'comment', timestamp: 1623672000 },
  { user_id: '8', post_id: '15', interaction: 'share', timestamp: 1623758400 },
  { user_id: '8', post_id: '16', interaction: 'like', timestamp: 1623844800 },
  { user_id: '9', post_id: '17', interaction: 'comment', timestamp: 1623931200 },
  { user_id: '9', post_id: '18', interaction: 'share', timestamp: 1624017600 },
  { user_id: '10', post_id: '19', interaction: 'like', timestamp: 1624104000 },
  { user_id: '10', post_id: '20', interaction: 'comment', timestamp: 1624190400 },
  { user_id: '1', post_id: '3', interaction: 'like', timestamp: 1624276800 },
  { user_id: '2', post_id: '5', interaction: 'comment', timestamp: 1624363200 },
  { user_id: '3', post_id: '7', interaction: 'share', timestamp: 1624449600 },
  { user_id: '4', post_id: '9', interaction: 'like', timestamp: 1624536000 },
  { user_id: '5', post_id: '11', interaction: 'comment', timestamp: 1624622400 },
  { user_id: '6', post_id: '13', interaction: 'share', timestamp: 1624708800 },
  { user_id: '7', post_id: '15', interaction: 'like', timestamp: 1624795200 },
  { user_id: '8', post_id: '17', interaction: 'comment', timestamp: 1624881600 },
  { user_id: '9', post_id: '19', interaction: 'share', timestamp: 1624968000 },
  { user_id: '10', post_id: '1', interaction: 'like', timestamp: 1625054400 },
  { user_id: '1', post_id: '4', interaction: 'comment', timestamp: 1625140800 },
  { user_id: '2', post_id: '6', interaction: 'share', timestamp: 1625227200 },
  { user_id: '3', post_id: '8', interaction: 'like', timestamp: 1625313600 },
  { user_id: '4', post_id: '10', interaction: 'comment', timestamp: 1625400000 },
  { user_id: '5', post_id: '12', interaction: 'share', timestamp: 1625486400 },
  { user_id: '6', post_id: '14', interaction: 'like', timestamp: 1625572800 },
  { user_id: '7', post_id: '16', interaction: 'comment', timestamp: 1625659200 },
  { user_id: '8', post_id: '18', interaction: 'share', timestamp: 1625745600 },
  { user_id: '9', post_id: '20', interaction: 'like', timestamp: 1625832000 },
  { user_id: '10', post_id: '2', interaction: 'comment', timestamp: 1625918400 }
];

class RecommendController {
  static async recommendPosts(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const result = await RecommendService.recommendPosts(userID, userInteractions, posts);
      return res.status(200).json({
        status: 200,
        message: 'Recommendation success',
        data: result
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message || 'Internal Server Error'
      });
    }
  }
}

export default RecommendController;
