import React, { useCallback } from 'react';
import styles from '@/components/common/card/imageOptionCard/ImageOptionCard.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import BaseButton from '@/widgets/button/baseButton';
import IconButton from '@/widgets/button/iconButton';
import FlipIcon from '@/assets/icons/flip.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  roundText: string;
  dateText: string;
  title: string;
  type: 'single' | 'double';
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
  text,
  base,
  flip,
  onClick,
}: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(`image-inner`)}>
      <div className={cn('image-wrapper')}>
        <button className={cn('image-button')} onClick={() => onClick(text)}>
          <Image
            src={base}
            alt={text}
            fill={true}
            sizes="100%"
            priority={true}
            className={cn('image')}
          />
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
                      baseTokenPrice: 0.002,
                      roundTicker: 'VITA',
                      roundTokenName: 'VITALIK',
                      roundTokenPrice: 0.001,
                    },
                  }),
                );
              }}
            />
          )}
          {type === 'single' && (
            <div>
              <IconButton
                name="share-button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  dispatch(
                    OPEN_MODAL({
                      name: 'ShareResultModal',
                      data: {
                        topicId: topicId,
                        title: title,
                        roundText: roundText,
                        dateText: dateText,
                        option: {
                          name: text,
                          imageUrl: base,
                        },
                      },
                    }),
                  );
                }}
                shape="round"
                height="small"
                classNames={['button-blue']}
              >
                <div className={cn('button-inner')}>
                  <ShareIcon viewBox="0 0 24 24" />
                </div>
              </IconButton>
            </div>
          )}
          <div className={cn('icon-button-container')}>
            <IconButton
              name="flip-button"
              onClick={() => console.log('Flip button clicked')}
              shape="round"
              height="small"
              classNames={['button-blue']}
            >
              <div className={cn('button-inner')}>
                <FlipIcon viewBox="0 0 25 24" />
              </div>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptionCard;
