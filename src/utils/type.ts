export interface User {
  id: string;
  tags: string[];
}

export interface Post {
  post_id: string;
  title: string;
  tags: string[];
}

export interface UserInteraction {
  user_id: string;
  post_id: string;
  interaction: string;
  timestamp: number; // Thêm thời gian tương tác
}
