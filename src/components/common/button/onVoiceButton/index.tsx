'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/components/common/button/onVoiceButton/OnVoiceButton.module.scss';
import IconButton from '@/widgets/button/iconButton';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getTopicVoice } from '@/shared/api/Topics';

const cn = classNames.bind(styles);

const OnVoiceButton = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_VOICE],
    queryFn: () => getTopicVoice(),
  });
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audio) {
      if (data && data.biggestTopicVoiceUrl) {
        const newAudio = new Audio(data?.biggestTopicVoiceUrl);
        newAudio.src = data.biggestTopicVoiceUrl;
        newAudio.controls = true;
        newAudio.autoplay = true;
        newAudio.loop = true;
        setAudio(newAudio);
      }
    } else {
      isPlay ? audio.play() : audio.pause();
    }
  }, [isPlay]);

  const handlePlay = useCallback(() => {
    if (isPlay) {
      audio?.pause();
      setIsPlay(false);
    } else {
      audio?.play();
      setIsPlay(true);
    }
  }, [data, isPlay, audio]);

  return (
    <IconButton
      shape={'round'}
      onClick={() => handlePlay()}
      name="voice-button"
      height="medium"
      classNames={['button-blue']}
    >
      <Image
        src={getStaticSrc('icon', ICON_SRC_PATH.SRC.VOICE)}
        alt="voice-icon"
        width={24}
        height={24}
        className={cn('voice-icon')}
      />
    </IconButton>
  );
};

export default OnVoiceButton;
