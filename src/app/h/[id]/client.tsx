'use client';
import React from 'react';
import styles from '@/app/h/[id]/client.module.scss';
import classNames from 'classnames/bind';
import { Topic } from '@/shared/types/data/topic';
import CanvasContainer from '@/components/container/canvas-container';
import GameMetaContainer from '@/components/container/game-meta';
import { fetchDateFormat } from '@/shared/utils/date';
import UploadImageCard from '@/components/common/card/uploadImageCard';
import UploadVoiceCard from '@/components/common/card/uploadVoiceCard';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  topic: Topic;
};

const test =
  'https://dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com/Topic/240813-072002-10.png';

const HonorClientPage = ({ id, topic }: Props) => {
  return (
    <div className={cn('container')}>
      <CanvasContainer
        type={'single'}
        title={topic.name}
        topicId={id}
        roundText={'finalist'}
        dateText={fetchDateFormat(topic.startAt)}
        source={[
          {
            text: 'Donald Trump',
            base: test,
            flip: test,
          },
        ]}
      />
      <div className={cn('info-container')}>
        <GameMetaContainer
          topicId={id}
          startAt={fetchDateFormat(topic.startAt)}
          endAt={fetchDateFormat(topic.endAt)}
          title={'Donald Trump'}
          status={'finalist'}
          label={topic.name}
          isFinal={true}
        />
        <div className={cn('card-wrapper')}>
          <UploadImageCard />
          <UploadVoiceCard />
        </div>
      </div>
    </div>
  );
};

export default HonorClientPage;
