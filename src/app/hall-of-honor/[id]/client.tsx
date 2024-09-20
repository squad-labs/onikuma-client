'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '@/app/hall-of-honor/[id]/client.module.scss';
import classNames from 'classnames/bind';
import { HonorType } from '@/shared/types/data/honor';
import GameMetaContainer from '@/components/container/game-meta';
import { fetchDateFormat } from '@/shared/utils/date';
import UploadImageCard from '@/components/common/card/uploadImageCard';
import UploadVoiceCard from '@/components/common/card/uploadVoiceCard';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  honor: HonorType;
};

const HallOfHonorClientPage = ({ id, honor }: Props) => {
  const router = useRouter();
  const pickerLength = useMemo(
    () => honor.competitors.length,
    [honor.competitors],
  );

  const [pickerManager, setPickerManager] = useState<
    { isFlip: boolean; isSkip: boolean }[]
  >(new Array(pickerLength).fill({ isFlip: false, isSkip: false }));
  const [voiceManager, setVoiceManager] = useState<{
    isFlip: boolean;
    isSkip: boolean;
  }>({ isFlip: false, isSkip: honor.isBiggestTopicPooler ? true : false });

  const isSkippedAll = useMemo(() => {
    return (
      pickerManager.every((picker) => picker.isSkip) && voiceManager.isSkip
    );
  }, [pickerManager, voiceManager]);

  useEffect(() => {
    if (isSkippedAll) {
      setTimeout(() => {
        router.replace('/my-page');
      }, 1000);
    }
  }, [isSkippedAll]);

  if (honor.competitors.length === 0) {
    return <div>error</div>;
  }

  const handleSkip = (index: number) => {
    const newPicker = pickerManager.map((picker, idx) => {
      return idx === index ? { ...picker, isSkip: true } : picker;
    });

    setPickerManager(newPicker);
  };

  const handleFlip = (index: number) => {
    const newPicker = pickerManager.map((picker, idx) => {
      return idx === index ? { ...picker, isFlip: !picker.isFlip } : picker;
    });

    setPickerManager(newPicker);
  };

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
        {honor?.competitors?.map((competitor, index) => {
          return (
            <UploadImageCard
              key={index}
              index={index}
              topicId={id}
              pickerName={competitor.name}
              setSkip={() => handleSkip(index)}
              withBorder={false}
              withbackGround={false}
              isFlip={pickerManager[index].isFlip}
              baseImage={competitor.imgUrl}
              isSkip={pickerManager[index].isSkip}
              flipImage={competitor.biggestImgUrl}
              setFlip={() => handleFlip(index)}
            />
          );
        })}
        {honor.isBiggestTopicPooler && (
          <div
            className={cn(
              'upload-voice-wrapper',
              voiceManager.isSkip && 'skip',
            )}
          >
            <UploadVoiceCard
              topicId={id}
              withBorder={false}
              withbackGround={false}
              setSkip={() => setVoiceManager({ ...voiceManager, isSkip: true })}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default HallOfHonorClientPage;
