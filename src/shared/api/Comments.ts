import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

type PostCommentsParams = {
  topicId: string;
  contents: string;
};

export const postCommnets = async (params: PostCommentsParams) => {
  try {
    const res = await axios.post('/api/comments', params, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (err) {
    return err;
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
      `/api/comments/all/${topicId}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return [];
    return [];
  }
};

type GetCommentLikesProps = {
  commentId: string;
};

export const getCommentLikes = async ({ commentId }: GetCommentLikesProps) => {
  try {
    const res = await axios.get(`/api/comments/likes/${commentId}`, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
