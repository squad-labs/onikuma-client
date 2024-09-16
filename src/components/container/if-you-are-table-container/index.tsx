import React from 'react';
import styles from '@/components/container/if-you-are-table-container/IfYouAreTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const IfYouAreTableContainer = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('wrapper')} style={{ width: '25%' }}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="If you..."
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '25%' }}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="You get"
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '30%' }}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="If you are..."
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '20%' }}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Multipliers"
            />
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        <div className={cn('list-item')}>
          <div className={cn('wrapper')} style={{ width: '25%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Pool in'}
            />
          </div>
          <div className={cn('h-wrapper')} style={{ width: '25%' }}>
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ONIGIRI)}
              alt="onigiri"
              width={28}
              height={28}
              priority
            />
            <BaseText size="medium" color="DARK" weight="bold" text={'100'} />
          </div>
          <div className={cn('v-wrapper')} style={{ width: '30%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Holding 1'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'ONIKUMA'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'GENESIS NFT'}
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '20%' }}>
            <BaseText size="medium" color="DARK" weight="bold" text={'x2'} />
          </div>
        </div>
        <div className={cn('list-item')}>
          <div className={cn('wrapper')} style={{ width: '25%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Win a game'}
            />
          </div>
          <div className={cn('h-wrapper')} style={{ width: '25%' }}>
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ONIGIRI)}
              alt="onigiri"
              width={28}
              height={28}
              priority
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'10,000'}
            />
          </div>
          <div className={cn('v-wrapper')} style={{ width: '30%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Holding 2'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'ONIKUMA'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'GENESIS NFT'}
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '20%' }}>
            <BaseText size="medium" color="DARK" weight="bold" text={'x2.5'} />
          </div>
        </div>
        <div className={cn('list-item')}>
          <div className={cn('w-wrapper')} style={{ width: '25%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Share on'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'social'}
            />
          </div>
          <div className={cn('h-wrapper')} style={{ width: '25%' }}>
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ONIGIRI)}
              alt="onigiri"
              width={28}
              height={28}
              priority
            />
            <BaseText size="medium" color="DARK" weight="bold" text={'30'} />
          </div>
          <div className={cn('v-wrapper')} style={{ width: '30%' }}>
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'Holding 3+'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'ONIKUMA'}
            />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'GENESIS NFT'}
            />
          </div>
          <div className={cn('wrapper')} style={{ width: '20%' }}>
            <BaseText size="medium" color="DARK" weight="bold" text={'x3'} />
          </div>
        </div>
        <div
          className={cn('list-item')}
          style={{ justifyContent: 'flex-start' }}
        >
          <div className={cn('w-wrapper')} style={{ width: '25%' }}>
            <BaseText size="medium" color="DARK" weight="bold" text={'Write'} />
            <BaseText
              size="medium"
              color="DARK"
              weight="bold"
              text={'comment'}
            />
          </div>
          <div className={cn('h-wrapper')} style={{ width: '25%' }}>
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ONIGIRI)}
              alt="onigiri"
              width={28}
              height={28}
              priority
            />
            <BaseText size="medium" color="DARK" weight="bold" text={'50'} />
          </div>
        </div>
        <div className={cn('list-string')}>
          <BaseText
            size="medium"
            color="DARK"
            weight="light"
            text={'* Pool in earnings are limited to 1,000 Onigiri per day.'}
          />
          <BaseText
            size="medium"
            color="DARK"
            weight="light"
            text={'* Comment earnings are limited to 1,000 Onigiri per day.'}
          />
        </div>
        <div className={cn('list-string')}>
          <BaseText
            size="medium"
            color="DARK"
            weight="light"
            text={'* Game win earnings are limited to once per day.'}
          />
          <BaseText
            size="medium"
            color="DARK"
            weight="light"
            text={
              '* Social media sharing earnings are limited to once per day.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default IfYouAreTableContainer;
