export type ModalType = 'PoolInModal' | 'DashboardModal' | 'ShareTopicModal' | 'ShareResultModal';

export type ShareTopicModalProps = {
  topicId: string;
  title: string;
  roundText: string;
  dateText: string;
  options: [
    {
      name: string;
      imageUrl: string;
    },
    {
      name: string;
      imageUrl: string;
    },
  ];
};


export type ShareResultModalProps = {
  topicId: string;
  title: string;
  roundText: string;
  dateText: string;
  option: {
    name: string;
    imageUrl: string;
  }
}

export type PoolInModalProps = {
  topicId: string;
  title: string;
  imageUrl: string;
  poolAmount: number;
  baseTicker: string;
  baseTokenPrice: string;
  baseTokenName: string;
  roundTokenName: string;
  roundTicker: string;
  roundTokenPrice: string;
}