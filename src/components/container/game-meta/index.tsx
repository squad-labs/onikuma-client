import React, { useContext } from 'react';
import styles from '@/components/container/game-meta/GameMetaContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import BaseDivider from '@/widgets/divider/baseDivider';
import DateText from '@/widgets/text/dateText';
import IconButton from '@/widgets/button/iconButton';
import ShareIcon from '@/assets/icons/share.svg';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useRound } from '@/shared/hooks/useRound';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  startAt: string;
  endAt: string;
  title: string;
  status: string;
  isFinal: boolean;
  label: string;
};

const GameMetaContainer = ({
  topicId,
  startAt,
  endAt,
  title,
  status,
  isFinal,
  label,
}: Props) => {
  const dispatch = useDispatch();
  const { options, currentIndex } = useContext(RoundContext);
  const { roundIndex } = useRound(RoundContext);

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
            onClick={() => {
              dispatch(
                OPEN_MODAL({
                  name: 'ShareTopicModal',
                  data: {
                    topicId: topicId,
                    title: title,
                    roundText: status,
                    dateText: startAt,
                    options: [
                      {
                        name: options[currentIndex[roundIndex]].name,
                        imageUrl: options[currentIndex[roundIndex]].imgUrl,
                      },
                      {
                        name: options[
                          currentIndex[options.length - 1 - roundIndex]
                        ].name,
                        imageUrl:
                          options[currentIndex[options.length - 1 - roundIndex]]
                            .imgUrl,
                      },
                    ] 
                  },
                }),
              )
            }}
            classNames={['button-blue']}
          >
            <ShareIcon viewBox="0 0 24 24" />
          </IconButton>
        )}
      </div>
    </section>
  );
};

export default GameMetaContainer;
