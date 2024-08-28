import React from 'react';
import styles from '@/components/common/card/uploadImageCard/UploadImageCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import ImageUploadInput from '@/components/common/input/imageUploadInput';
import BaseButton from '@/widgets/button/baseButton';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

type Props = {
  withBorder: boolean;
  withbackGround: boolean;
};

const UploadImageCard = ({ withBorder, withbackGround }: Props) => {
  return (
    <div
      className={cn('card-container')}
      style={{
        border: withBorder ? `1px solid ${COLOR['DARK']}` : 'none',
        backgroundColor: withbackGround ? COLOR['LIGHT'] : 'transparent',
      }}
    >
      <BaseText
        text="You pooled in the biggest for Donald Trump!"
        color="DARK"
        size="large"
        weight="bold"
      />
      <div className={cn('text-container')}>
        <BaseText
          text="Celebrate your contribution with custom images!"
          color="DARK_GRAY_2"
          size="medium"
          weight="regular"
        />
        <BaseText
          text="They are shown to all players throughout the gameplay."
          color="DARK_GRAY_2"
          size="medium"
          weight="regular"
        />
      </div>
      <div className={cn('input-wrapper')}>
        <ImageUploadInput />
      </div>
      <div className={cn('button-wrapper')}>
        <BaseButton
          text="Confirm"
          shape="shape-4"
          role="button"
          label="image-confirm-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
          theme="fill"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {}}
        />
        <BaseButton
          text="Skip this"
          shape="shape-4"
          role="button"
          label="image-confirm-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
          theme="outline"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default UploadImageCard;
