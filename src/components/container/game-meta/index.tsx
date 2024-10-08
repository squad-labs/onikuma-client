import React, { Fragment, useContext, useEffect, useState } from 'react';
import styles from '@/components/container/game-meta/GameMetaContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import BaseDivider from '@/widgets/divider/baseDivider';
import DateText from '@/widgets/text/dateText';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useRound } from '@/shared/hooks/useRound';
import ShareGameButton from '@/components/common/button/shareGameButton';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  startAt: string;
  endAt: string;
  title: string;
  status?: string;
  isFinal?: boolean;
  label: string;
  onlyDate?: boolean;
};

const GameMetaContainer = ({
  topicId,
  startAt,
  endAt,
  title,
  status,
  isFinal,
  label,
  onlyDate = false,
}: Props) => {
  const [width, setWidth] = useState<number>(0);
  const { options, currentIndex } = useContext(RoundContext);
  const { roundIndex } = useRound(RoundContext);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {status && (
          <Fragment>
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
          </Fragment>
        )}
        <DateText
          startDate={startAt}
          color={'DARK_GRAY_2'}
          size={'medium'}
          weight={'regular'}
        />
      </div>
      <div className={cn('title-container')}>
        <BaseText
          text={title}
          color={'DARK_GRAY_2'}
          size={width > 820 ? 'extra-large' : 'large'}
          weight={'bold'}
        />
        {isFinal ||
          onlyDate ||
          (width > 820 && status && (
            <ShareGameButton
              topicId={topicId}
              title={title}
              status={status}
              startAt={startAt}
              name={options[currentIndex[roundIndex]].name}
              imageUrl={options[currentIndex[roundIndex]].imgUrl}
              buttonDirection="left"
            />
          ))}
      </div>
    </section>
  );
};

export default GameMetaContainer;
