'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/app/hall-of-honor/[id]/client.module.scss';
import classNames from 'classnames/bind';
import { HonorType } from '@/shared/types/data/honor';
import GameMetaContainer from '@/components/container/game-meta';
import { fetchDateFormat } from '@/shared/utils/date';
import UploadImageCard from '@/components/common/card/uploadImageCard';
import Image from 'next/image';
import UploadVoiceCard from '@/components/common/card/uploadVoiceCard';
import ImageUploadImage from '@/assets/images/image-upload.png';
import IconButton from '@/widgets/button/iconButton';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { getStaticSrc } from '@/shared/utils/etc';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  honor: HonorType;
};

const HallOfHonorClientPage = ({ id, honor }: Props) => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(true);
  const [skipImage, setSkipImage] = useState<boolean>(false);
  const [skipVoice, setSkipVoice] = useState<boolean>(
    !honor.isBiggestTopicPooler,
  );
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  useEffect(() => {
    if (skipImage && skipVoice) {
      setTimeout(() => {
        router.replace('/my-page');
      }, 1000);
    }
  }, [skipImage, skipVoice]);

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
        {honor.competitors[0].isBiggestPickerPooler && (
          <div className={cn('upload-image-wrapper', skipImage && 'skip')}>
            <div className={cn('card-wrapper')}>
              <UploadImageCard
                topicId={id}
                pickerName={honor.competitors[0].name}
                imageFile={imageFile}
                setImageFile={setImageFile}
                setSkip={() => setSkipImage(true)}
                withBorder={false}
                withbackGround={false}
              />
            </div>
            <div className={cn('image-wrapper', 'flip-wrapper')}>
              <div className={cn('background')} />
              {isFlipped ? (
                <Image
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : honor.competitors[0].biggestImgUrl.length === 0
                        ? ImageUploadImage
                        : honor.competitors[0].biggestImgUrl
                  }
                  alt={honor.competitors[0].name}
                  width={1200}
                  height={1200}
                  priority
                  className={cn('image', 'unflipped')}
                />
              ) : (
                <Image
                  src={honor.competitors[0].imgUrl}
                  alt={honor.competitors[0].name}
                  width={1200}
                  height={1200}
                  priority
                  className={cn('image', 'flipped')}
                />
              )}
              <div className={cn('button-container')}>
                <IconButton
                  name="flip-button"
                  onClick={() => handleFlip()}
                  shape="round"
                  height={'small'}
                  classNames={[isFlipped ? 'button-white' : 'button-blue']}
                >
                  <div className={cn('button-inner')}>
                    <Image
                      src={getStaticSrc(
                        'icon',
                        isFlipped
                          ? ICON_SRC_PATH.SRC.FLIP_FILL
                          : ICON_SRC_PATH.SRC.FLIP,
                      )}
                      alt="share"
                      width={24}
                      height={22}
                      priority
                      quality={100}
                      className={cn('flip-icon')}
                    />
                  </div>
                </IconButton>
              </div>
            </div>
          </div>
        )}
        {honor.isBiggestTopicPooler && (
          <div className={cn('upload-voice-wrapper', skipVoice && 'skip')}>
            <UploadVoiceCard
              topicId={id}
              withBorder={false}
              withbackGround={false}
              setAudioUrl={setAudioUrl}
              audioUrl={audioUrl}
              setSkip={() => setSkipVoice(true)}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default HallOfHonorClientPage;
