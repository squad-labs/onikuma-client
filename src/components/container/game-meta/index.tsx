import React from 'react';
import styles from '@/components/container/game-meta/GameMetaContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import BaseDivider from '@/widgets/divider/baseDivider';
import DateText from '@/widgets/text/dateText';
import IconButton from '@/widgets/button/iconButton';
import ShareIcon from '@/assets/icons/share.svg';

const cn = classNames.bind(styles);

type Props = {
  startAt: string;
  endAt: string;
  title: string;
  status: string;
  isFinal: boolean;
  label: string;
};

const GameMetaContainer = ({
  startAt,
  endAt,
  title,
  status,
  isFinal,
  label,
}: Props) => {
  return (
    <section className={cn('meta-container')}>
      {isFinal && (
        <div className={cn('label-container')}>
          <BaseText
            text={label}
            color={'BASE_BLUE_1'}
            size={'medium'}
            weight={'regular'}
          />
        </div>
      )}
      <div className={cn('round-container')}>
        <BaseText
          text={status}
          color={'DARK_GRAY_2'}
          size={'medium'}
          weight={'regular'}
        />
        <BaseDivider
          type={'vertical'}
          color={'DARK_GRAY_2'}
          length={50}
          thick={1.5}
        />
        <DateText
          startDate={startAt}
          endDate={endAt}
          color={'DARK_GRAY_2'}
          size={'medium'}
          weight={'regular'}
        />
      </div>
      <div className={cn('title-container')}>
        <BaseText
          text={title}
          color={'DARK_GRAY_2'}
          size={'extra-large'}
          weight={'bold'}
        />
        {!isFinal && (
          <IconButton
            name="Button"
            height={'medium'}
            shape="round"
            onClick={() => console.log('Button Clicked')}
            classNames={['button-blue']}
            disabled={true}
          >
            <ShareIcon viewBox="0 0 24 24" />
          </IconButton>
        )}
      </div>
    </section>
  );
};

export default GameMetaContainer;
