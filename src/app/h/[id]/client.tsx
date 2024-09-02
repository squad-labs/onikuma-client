'use client';
import React from 'react';
import styles from '@/app/h/[id]/client.module.scss';
import classNames from 'classnames/bind';
import CanvasContainer from '@/components/container/canvas-container';
import GameMetaContainer from '@/components/container/game-meta';
import { fetchDateFormat } from '@/shared/utils/date';
import UploadImageCard from '@/components/common/card/uploadImageCard';
import UploadVoiceCard from '@/components/common/card/uploadVoiceCard';
import PoolResultModal from '@/components/common/modal/poolResultModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getPollResult } from '@/shared/api/Dashboard';
import { getModal } from '@/context/global/slice/modalSlice';
import { useSelector } from 'react-redux';
import { HonorType } from '@/shared/types/data/honor';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  honor: HonorType;
};

const HonorClientPage = ({ id, honor }: Props) => {
  const modal = useSelector(getModal);

  if (honor.competitors.length === 0) {
    return <div>error</div>;
  }

  return (
    <div className={cn('container')}>
      <CanvasContainer
        type={'single'}
        title={honor.name}
        topicId={id}
        roundText={'finalist'}
        dateText={fetchDateFormat(honor.startAt)}
        source={[
          {
            text: honor.competitors[0].name,
            base: honor.competitors[0].imgUrl,
            flip: honor.competitors[0].biggestImgUrl,
          },
        ]}
      />
      <div className={cn('info-container')}>
        <GameMetaContainer
          topicId={id}
          startAt={fetchDateFormat(honor.startAt)}
          endAt={fetchDateFormat(honor.endAt)}
          title={'Donald Trump'}
          status={'finalist'}
          label={honor.name}
          isFinal={true}
        />
        <div className={cn('card-wrapper')}>
          <UploadImageCard
            topicId={id}
            pickerName={honor.competitors[0].name}
            withBorder
            withbackGround
          />
          <UploadVoiceCard withBorder withbackGround />
        </div>
      </div>
      {modal.name === 'PoolResutlModal' &&
        modal.data &&
        'totalGain' in modal.data && (
          <PoolResultModal
            topicId={modal.data.topicId}
            totalGain={modal.data.totalGain}
            totalPoolIn={modal.data.totalPnL}
            totalPnL={modal.data.totalPoolIn}
            competitors={modal.data.competitors}
          />
        )}
    </div>
  );
};

export default HonorClientPage;
