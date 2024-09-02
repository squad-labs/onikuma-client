'use client';
import React from 'react';
import styles from '@/app/hall-of-honor/[id]/client.module.scss';
import classNames from 'classnames/bind';
import { HonorType } from '@/shared/types/data/honor';
import GameMetaContainer from '@/components/container/game-meta';
import { fetchDateFormat } from '@/shared/utils/date';
import UploadImageCard from '@/components/common/card/uploadImageCard';
import Image from 'next/image';
import UploadVoiceCard from '@/components/common/card/uploadVoiceCard';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  honor: HonorType;
};

const HallOfHonorClientPage = ({ id, honor }: Props) => {
  if (honor.competitors.length === 0) {
    return <div>error</div>;
  }
  return (
    <div className={cn('container')}>
      <section className={cn('top-inner')}>
        <h1 className={cn('top-title')}>Hall of Honor</h1>
      </section>
      <section className={cn('mid-inner')}>
        <GameMetaContainer
          topicId={id}
          startAt={fetchDateFormat(honor.startAt)}
          endAt={fetchDateFormat(honor.endAt)}
          title={honor.name}
          label={'Hall of Honor'}
          onlyDate
        />
        <div className={cn('upload-image-wrapper')}>
          <div className={cn('card-wrapper')}>
            <UploadImageCard
              topicId={id}
              pickerName={honor.competitors[0].name}
              withBorder={false}
              withbackGround={false}
            />
          </div>
          <div className={cn('image-wrapper')}>
            <Image
              src={honor.competitors[0].imgUrl}
              alt={honor.competitors[0].name}
              width={1200}
              height={1200}
              priority
              className={cn('image')}
            />
          </div>
        </div>
        <div className={cn('upload-voice-wrapper')}>
          <UploadVoiceCard withBorder={false} withbackGround={false} />
        </div>
      </section>
    </div>
  );
};

export default HallOfHonorClientPage;
