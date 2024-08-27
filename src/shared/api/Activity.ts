import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

type PostPoolInParams = {
  topicId: string;
  topicToken: number;
  reserveToken: number;
  pickerName: string;
};

export const postPoolIn = async (params: PostPoolInParams) => {
  try {
    const res = await axios.post('/activities/pool-in', params, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

type PostVoteParams = {
  topicId: string;
  winner: string;
  loser: string;
}

export const postVote = async({ topicId, winner, loser }: PostVoteParams) => {
  try {
    const res = await axios.post(`/activities/vote/${topicId}`, {
      winner,
      loser,
    }, {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}