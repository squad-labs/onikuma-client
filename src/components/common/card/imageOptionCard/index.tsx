import React from 'react';
import styles from '@/components/common/card/imageOptionCard/ImageOptionCard.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import BaseButton from '@/widgets/button/baseButton';
import IconButton from '@/widgets/button/iconButton';
import FlipIcon from '@/assets/icons/flip.svg';
import ShareIcon from '@/assets/icons/share.svg';

const cn = classNames.bind(styles);

type Props = {
  type: 'single' | 'double';
  text: string;
  base: string;
  flip?: string;
  onClick: (text: string) => void;
};

const ImageOptionCard = ({ type, text, base, flip, onClick }: Props) => {
  return (
    <div className={cn(`image-inner`)}>
      <div className={cn('image-wrapper')}>
        <button className={cn('image-button')} onClick={() => onClick(text)}>
          <Image
            src={base}
            alt={text}
            fill={true}
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
              onClick={() => console.log('Pool button clicked')}
            />
          )}
          {type === 'single' && (
            <div>
              <IconButton
                name="share-button"
                onClick={() => console.log('Share button clicked')}
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
