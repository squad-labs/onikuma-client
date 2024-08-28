export type HonorType = {
  topidId: string;
  name: string;
  startAt: string;
  endAt: string;
  isBiggestTopicPooler: boolean;
  competitors: {
    name: string;
    imgUrl: string;
    biggestImgUrl: string;
    isBiggestPickerPooler: boolean;
  }[];
};
