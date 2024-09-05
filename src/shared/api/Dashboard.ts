import axios from 'axios';
import { getCookie } from 'cookies-next';

type GetPollResultParams = {
  topicId: string;
};

export const getPollResult = async ({ topicId }: GetPollResultParams) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.get(`/api/dashboards/my-data/detail/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    return err;
  }
};
