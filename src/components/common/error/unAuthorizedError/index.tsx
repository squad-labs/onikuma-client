'use client';
import React from 'react';
import styles from '@/components/common/error/unAuthorizedError/UnAuthorizedError.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { IMAGE_SRC_PATH } from '@/shared/constants/PATH';
import BaseButton from '@/widgets/button/baseButton';
import { useConnect } from '@/shared/hooks/useConnect';

const cn = classNames.bind(styles);

const UnAuthorizedError = () => {
  const { handleModal } = useConnect();

  return (
    <div className={cn('container')}>
      <div className={cn('text-container')}>
        <h1 className={cn('title')}>Oops...</h1>
        <h1 className={cn('title-sub')}>Access not allowed</h1>
        <p className={cn('text')}>
          You don’t have Onikuma or partner NFT needed to access the game!
        </p>
        <p className={cn('text')}>
          Try logging in with another wallet having the NFT, if you have one.
        </p>
        <div className={cn('button-container')}>
          <BaseButton
            type="button"
            text="Disconnect Wallet"
            label="disconnect-wallet-button"
            role="button"
            colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
            theme={'fill'}
            shape={'shape-7'}
            fontSize={'large'}
            fontWeight={'regular'}
            loading={false}
            onClick={() => handleModal()}
          />
        </div>
      </div>
      <div className={cn('image-container')}>
        <Image
          src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.UNAUTHORIZED_ERROR)}
          alt="unauthorized error"
          width={600}
          height={600}
          className={cn('image')}
        />
      </div>
    </div>
  );
};

export default UnAuthorizedError;
