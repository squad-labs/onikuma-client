export type ActivityTypeResponse = ActicityMetaType & {
  broadcastData: ActivityType;
};

export type ActivityType = {
  activityId: string;
  topicId: string;
  userWallet: string;
  poolIn: number;
  createdAt: string;
};

export type ActicityMetaType = {
  isBiggestPickerPooler: boolean;
  isBiggestTopicPooler: boolean;
};
