import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';
import { getCookie } from 'cookies-next';

type PostPoolInParams = {
  topicId: string;
  topicToken: number;
  reserveToken: number;
  pickerName: string;
};

export const postPoolIn = async (params: PostPoolInParams) => {
  try {
    const res = await axios.post('/api/activities/pool-in', params, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

type PostVoteParams = {
  topicId: string;
  winner: string;
  loser: string;
};

export const postVote = async ({ topicId, winner, loser }: PostVoteParams) => {
  try {
    const res = await axios.post(
      `/api/activities/vote/${topicId}`,
      {
        winner,
        loser,
      },
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

type GetRecentActivity = {
  topicId: string;
};

export const getRecentActivity = async ({ topicId }: GetRecentActivity) => {
  try {
    const res = await axios.get(
      `/api/activities/all/${topicId}?page=${1}&pageSize=${10}`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export type GetTopicTokenPriceParams = {
  topicId: string;
  amount: string;
};

export const getTopicTokenPrice = async ({
  topicId,
  amount,
}: GetTopicTokenPriceParams) => {
  try {
    const token = getCookie('token');
    const res = await axios.post(
      `/api/activities/buy-estimation/${topicId}`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    return err;
  }
};
