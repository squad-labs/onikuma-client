import { TopicStatus } from '@/shared/types/data/topic';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export const getTopicById = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/detail/66bb07efff419cee8c3888e1`,
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

export const getTopicByStatus = async (status: TopicStatus) => {
  const token = getCookie('token');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/titles?status=${status}`,
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
  const token = getCookie('token');

  try {
    const res = await axios.get('/api/topics/titles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};
