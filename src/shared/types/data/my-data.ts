export type UserTopic = {
  topicId: string;
  name: string;
  status: string;
  startAt: string;
  endAt: string;
  totalPoolIn: number;
  totalCostPnL: number;
  totalPercentPnL: number;
  isBiggestTopicPooler: boolean;
  competitors: {
    name: string;
    imgUrl: string;
    isBiggestPickerPooler: boolean;
  }[];
};

export type MyTotalData = {
  myTotalPoolIn: number;
  totalCostPnL: number;
  myTotalPnL: number;
};

export type MyData = MyTotalData & {
  result: UserTopic[];
};
