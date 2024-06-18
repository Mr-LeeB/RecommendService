import { TfIdf } from 'natural';
import { Post, UserInteraction } from '~/utils/type';
class RecommendService {
  static calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  static getInteractionWeight(interaction: string): number {
    switch (interaction) {
      case 'like':
        return 1;
      case 'comment':
        return 2;
      case 'share':
        return 3;
      default:
        return 0;
    }
  }

  static recommendPosts(userId: string, userInteractions: UserInteraction[], posts: Post[], topN: number = 5): Post[] {
    const userPosts = userInteractions.filter((ui) => ui.user_id === userId).map((ui) => ui.post_id);
    const tfidfVectorizer = new TfIdf();

    posts.forEach((post) => {
      tfidfVectorizer.addDocument(post.tags.join(' '), post.post_id);
    });

    const userPostVectors = userPosts.map((postId) => {
      const postIndex = posts.findIndex((post) => post.post_id === postId);
      const vector: number[] = [];
      tfidfVectorizer.tfidfs(posts[postIndex].tags.join(' '), (i, measure) => {
        vector.push(measure);
      });
      return vector;
      // return tfidfVectorizer.documents[postIndex];
    });

    const scores = posts.map((_, idx) => {
      const postVector: number[] = [];
      tfidfVectorizer.tfidfs(posts[idx].tags.join(' '), (i, measure) => {
        postVector.push(measure);
      });
      const similarityScores = userPostVectors.map((userVector) =>
        this.calculateCosineSimilarity(userVector, postVector)
      );
      const interactionWeights = userInteractions
        .filter((ui) => ui.user_id === userId && ui.post_id === posts[idx].post_id)
        .map((ui) => this.getInteractionWeight(ui.interaction));
      const weightedScores = similarityScores.map((score, index) => score * (interactionWeights[index] || 1));
      return weightedScores.reduce((sum, score) => sum + score, 0);
    });

    console.log(scores.map((score, idx) => ({ score, idx: idx + 1 })));

    const recommendedPostIndices = scores
      .map((score, idx) => ({ score, idx }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.idx)
      .filter((idx) => !userPosts.includes(posts[idx].post_id))
      .slice(0, topN);

    return recommendedPostIndices.map((idx) => posts[idx]);
  }
}
export default RecommendService;
