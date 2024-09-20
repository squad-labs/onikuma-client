import axios from 'axios';
import { getCookie } from 'cookies-next';

type GetPollResultParams = {
  topicId: string;
};

export type GetPollResultResponse = {
  topicId: string;
  totalGain: number;
  totalPnL: number;
  totalPoolIn: number;
  competitors: {
    name: string;
    poolTvl: number;
    data: {
      gain: number;
      pnl: number;
      poolIn: number;
    };
  }[];
};

export const getPollResult = async ({
  topicId,
}: GetPollResultParams): Promise<GetPollResultResponse | undefined> => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.get(`/api/dashboards/my-data/detail/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as GetPollResultResponse;
  } catch (err) {
    return undefined;
  }
};

type Props = {
  page: number;
  pageSize: number;
};

export const getLeaderboard = async ({ page, pageSize }: Props) => {
  const token = getCookie('accessToken');

  try {
    const res = await axios.get(
      `/api/dashboards/leader-board?page=${page}&pageSize=${pageSize}`,
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
