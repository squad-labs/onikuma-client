import React from 'react';
import styles from '@/components/container/my-vote-container/MyVoteContainer.module.scss';
import classNames from 'classnames/bind';
import { MyVote } from '@/shared/types/data/dashboard';
import DownloadSvg from '@/assets/icons/download.svg';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import { thousandFormat } from '@/shared/utils/number';

const cn = classNames.bind(styles);

type Props = {
  myVote: MyVote;
};

const MyVoteContainer = ({ myVote }: Props) => {
  return (
    <div className={cn('container')}>
      <div className={cn('top-container')}>
        <BaseText
          text={'My Votings'}
          size={'large'}
          weight={'bold'}
          color={'DARK'}
        />
        <BaseText
          text={`($HONEY)`}
          size={'medium'}
          weight={'light'}
          color={'DARK_GRAY_5'}
        />
      </div>
      <div className={cn('table-header')}>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Name"
            />
            <DownloadSvg viewBox="0 0 16 16" className={cn('icon')} />
          </div>
          <div className={cn('header-inner-right')}>
            <div className={cn('inner-text')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Pooled In"
              />
            </div>
            <div className={cn('inner-text')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="# of Tokens"
              />
            </div>
          </div>
        </div>
        <div className={cn('header-wrapper')}>
          <div className={cn('header-inner-left')}>
            <BaseText
              size="medium"
              color="BASE_BLUE_1"
              weight="bold"
              text="Name"
            />
            <DownloadSvg viewBox="0 0 16 16" className={cn('icon')} />
          </div>
          <div className={cn('header-inner-right')}>
            <div className={cn('inner-text')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="Pooled In"
              />
            </div>
            <div className={cn('inner-text')}>
              <BaseText
                size="medium"
                color="BASE_BLUE_1"
                weight="bold"
                text="# of Tokens"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cn('table-body')}>
        {myVote.competitors.map((competitor, index) => {
          return (
            <div key={index} className={cn('list-item')}>
              <div className={cn('item-inner-left')}>
                <div className={cn('image-wrapper')}>
                  <Image
                    src={competitor.imgUrl}
                    alt={competitor.name}
                    fill={true}
                    priority={true}
                    className={cn('image')}
                  />
                </div>
                <div className={cn('text-wrapper')}>
                  <BaseText
                    text={competitor.name}
                    size={'medium'}
                    weight="regular"
                    color={'DARK'}
                  />
                </div>
              </div>
              <div className={cn('item-inner-right')}>
                <div className={cn('inner-text')}>
                  <BaseText
                    text={`$${thousandFormat(competitor.topicToken)}`}
                    size={'medium'}
                    weight="regular"
                    color={'DARK'}
                  />
                </div>
                <div className={cn('inner-text')}>
                  <BaseText
                    text={`$${thousandFormat(competitor.reserveToken)}`}
                    size={'medium'}
                    weight="regular"
                    color={'DARK'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyVoteContainer;
