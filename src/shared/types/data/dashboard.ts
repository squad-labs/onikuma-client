export type Dashboard = {
  topicId: string;
  totalVolume: number[];
  totalData: DashboardDataType[];
};

export type DashboardDataType = {
  name: string;
  imgUrl: string;
  vote: number;
  winningRate: number;
};

export type PollResult = {
  topicId: string;
  totalGain: number;
  totalPnL: number;
  totalPoolIn: number;
  competitors: Competitor[];
};

export type Competitor = {
  name: string;
  poolTvl: number;
  data: {
    gain: number;
    pnl: number;
    poolIn: number;
  };
};

export type MyVote = {
  topicId: string;
  competitors: {
    name: string;
    imgUrl: string;
    reserveToken: number;
    topicToken: number;
  }[];
};
