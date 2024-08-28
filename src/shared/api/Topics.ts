import { TopicStatus } from '@/shared/types/data/topic';
import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

export const getTopicById = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/detail/66bb07efff419cee8c3888e1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.ok && res.status === 200) {
      return await res.json();
    }
  } catch (err) {
    return err;
  }
};

export const getTopicByStatus = async (status: TopicStatus, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/titles?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.ok && res.status === 200) {
      return await res.json();
    }
  } catch (err) {
    return err;
  }
};

export const getTopicList = async () => {
  try {
    const res = await axios.get('/topics/titles', {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
