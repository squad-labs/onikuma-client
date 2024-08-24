export type CommentEmit = {
  topicId: string;
  contents: string;
};

export type Comment = {
  commentId: string;
  contents: string;
  topicId: string;
  userWallet: string;
  likes: number;
  createdAt: string;
  isLiked: boolean;
};
