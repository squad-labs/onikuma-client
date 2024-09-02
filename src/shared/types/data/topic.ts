export type Topic = {
  _id: string;
  name: string;
  ticker: string;
  biggestTopicVoiceUrl: string;
  status: TopicStatus;
  startAt: string;
  endAt: string;
  competitors: Option[];
};

export type TopicMetadata = {
  _id: string;
  name: string;
  biggestTopicVoiceUrl: string;
  status: TopicStatus;
  startAt: string;
  endAt: string;
};

export type Option = {
  name: string;
  imgUrl: string;
  biggestImgUrl: string;
};

export type TopicStatus = 'upComing' | 'onGoing' | 'completed';

export type TopicListItem = {
  _id: string;
  name: string;
  status: TopicStatus;
  startAt: string;
  endAt: string;
};
