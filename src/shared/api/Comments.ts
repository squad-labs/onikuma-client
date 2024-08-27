import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

type PostCommentsParams = {
  topicId: string;
  contents: string;
};

export const postCommnets = async (params: PostCommentsParams) => {
  try {
    const res = await axios.post('/comments', params, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

type GetAllCommentsParams = {
  topicId: string;
  pageSize: number;
  page: number;
};

export const getAllComments = async ({
  topicId,
  page,
  pageSize,
}: GetAllCommentsParams) => {
  try {
    const res = await axios.get(
      `/comments/all/${topicId}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    return [];
  }
};

type GetCommentLikesProps = {
  commentId: string;
};

type CommentLikesResponse = {
  commentId: string;
  likes: number;
  isLiked: boolean;
};

export const getCommentLikes = async ({
  commentId,
}: GetCommentLikesProps): Promise<CommentLikesResponse | undefined> => {
  try {
    const res = await axios.get(`/comments/likes/${commentId}`, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (error) {}
};
