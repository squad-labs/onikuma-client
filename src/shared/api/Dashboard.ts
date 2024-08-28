import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

type GetPollResultParams = {
  topicId: string;
};

export const getPollResult = async ({ topicId }: GetPollResultParams) => {
  try {
    const res = await axios.get(`/dashboards/my-data/detail/${topicId}`, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
