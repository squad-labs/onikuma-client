import axios from 'axios';
import { getCookie } from 'cookies-next';

type GetTokenDataParams = {
  topicId: string;
};

export const getTokenData = async ({ topicId }: GetTokenDataParams) => {
  try {
    const res = await axios.post(`/api/activities/token-price/${topicId}`);

    return res.data;
  } catch (err) {
    return err;
  }
};

type PostPoolInParams = {
  topicId: string;
  topicToken: number;
  reserveToken: number;
  pickerName: string;
};

export const postPoolIn = async (params: PostPoolInParams) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.post('/api/activities/pool-in', params, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = getCookie('accessToken');

  try {
    const res = await axios.post(
      `/api/activities/vote/${topicId}`,
      {
        winner,
        loser,
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

type GetRecentActivity = {
  topicId: string;
  page: number;
  pageSize: number;
};

export const getRecentActivity = async ({
  topicId,
  page,
  pageSize,
}: GetRecentActivity) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.get(
      `/api/activities/all/${topicId}?page=${page}&pageSize=${pageSize}`,
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

export type GetTopicTokenPriceParams = {
  topicId: string;
  amount: string;
};

export const getTopicTokenPrice = async ({
  topicId,
  amount,
}: GetTopicTokenPriceParams) => {
  try {
    const token = getCookie('accessToken');
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

type PostTopicVoiceParams = {
  topicId: string;
  text: string;
};

export const postTopicVoice = async ({
  topicId,
  text,
}: PostTopicVoiceParams) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.post(
      `/api/topics/create-topic-voice/${topicId}`,
      { text },
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

type ConfirmTopicVoiceParams = {
  topicId: string;
  biggestTopicVoiceUrl: string;
};

export const confirmTopicVoice = async ({
  topicId,
  biggestTopicVoiceUrl,
}: ConfirmTopicVoiceParams) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.post(
      `/api/topics/confirm-topic-voice/${topicId}`,
      {
        biggestTopicVoiceUrl,
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
