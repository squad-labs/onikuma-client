import React, { useCallback, useContext, useState } from 'react';
import styles from '@/components/common/card/imageOptionCard/ImageOptionCard.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import BaseButton from '@/widgets/button/baseButton';
import IconButton from '@/widgets/button/iconButton';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import ShareGameButton from '@/components/common/button/shareGameButton';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  roundText: string;
  dateText: string;
  title: string;
  type: 'single' | 'double';
  amount: string;
  text: string;
  base: string;
  flip?: string;
  onClick: (text: string) => void;
};

const ImageOptionCard = ({
  topicId,
  roundText,
  dateText,
  title,
  type,
  amount,
  text,
  base,
  flip,
  onClick,
}: Props) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { ticker } = useContext(RoundContext);

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleShowImage = useCallback(() => {
    if (!flip) {
      return (
        <Image
          src={base}
          alt={text}
          fill={true}
          sizes="100%"
          priority={true}
          className={cn('image')}
        />
      );
    } else {
      return (
        <div className={cn('flip-wrapper')}>
          <Image
            src={isFlipped ? flip : base}
            alt={text}
            fill={true}
            sizes="100%"
            priority={true}
            className={cn(isFlipped ? 'flipped' : 'unflipped')}
          />
        </div>
      );
    }
  }, [isFlipped, text, base, flip]);

  return (
    <div className={cn(`image-inner`)}>
      <div className={cn('image-wrapper')}>
        <button className={cn('image-button')} onClick={() => onClick(text)}>
          {handleShowImage()}
          <span className={cn('option-text')}>{text}</span>
        </button>
        <div className={cn('button-container')}>
          {type === 'double' && (
            <BaseButton
              text="Pool"
              theme="outline"
              colors={{ primary: 'LIGHT', secondary: 'BASE_BLUE_1' }}
              label="pool-button"
              role="button"
              shape="shape-3"
              fontSize={'medium'}
              loading={false}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                dispatch(
                  OPEN_MODAL({
                    name: 'PoolInModal',
                    data: {
                      topicId: topicId,
                      title: title,
                      value: text,
                      imageUrl: base,
                      poolAmount: 100,
                      baseTicker: 'HONEY',
                      baseTokenName: 'HONEY',
                      baseTokenPrice: 0.001,
                      roundTicker: ticker,
                      roundTokenName: ticker,
                      roundTokenPrice: amount,
                    },
                  }),
                );
              }}
            />
          )}
          {type === 'single' && (
            <ShareGameButton
              topicId={topicId}
              title={title}
              status={roundText}
              startAt={dateText}
              buttonDirection="down"
            />
          )}
          <div className={cn('icon-button-container')}>
            <IconButton
              name="flip-button"
              onClick={() => handleFlip()}
              shape="round"
              height={type === 'single' ? 'medium' : 'small'}
              classNames={['button-blue']}
            >
              <div className={cn('button-inner')}>
                <Image
                  src={getStaticSrc('icon', ICON_SRC_PATH.SRC.FLIP)}
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
    </div>
  );
};

export default ImageOptionCard;
