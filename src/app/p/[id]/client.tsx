'use client';
import React, { Fragment, Suspense, useContext, useMemo } from 'react';
import styles from '@/app/p/[id]/client.module.scss';
import classNames from 'classnames/bind';
import GameMetaContainer from '@/components/container/game-meta';
import CanvasContainer from '@/components/container/canvas-container';
import { CommentProvider } from '@/context/partial/commentContext/CommentProvider';
import CommentContainer from '@/components/container/comment-container';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { Topic } from '@/shared/types/data/topic';
import { fetchDateFormat } from '@/shared/utils/date';
import FinalOptionCard from '@/components/common/card/finalOptionCard';
import { useRound } from '@/shared/hooks/useRound';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  topic: Topic;
};

const PlayClientPage = ({ id, topic }: Props) => {
  const { options, currentIndex } = useContext(RoundContext);
  const { roundIndex, roundStatus, isFinal } = useRound(RoundContext);

  return (
    <CommentProvider id={id}>
      {isFinal ? (
        <div className={cn(`final-container`)}>
          <CanvasContainer
            type={'single'}
            source={[
              {
                text: options[0].name,
                base: options[0].imgUrl,
                flip: options[0].biggestImgUrl,
              },
            ]}
          />
          <div className={cn('info-container')}>
            <GameMetaContainer
              startAt={fetchDateFormat(topic.startAt)}
              endAt={fetchDateFormat(topic.endAt)}
              title={options[0].name}
              status={roundStatus}
              label={topic.name}
              isFinal={isFinal}
            />
            <Suspense>
              <FinalOptionCard
                baseTokenName={'HONEY'}
                baseTicker={'HONEY'}
                baseTokenPrice={'0.01'}
                roundTokenName={'TRUMP'}
                roundTicker={'TRUMP'}
                roundTokenPrice={'0.001'}
              />
            </Suspense>
          </div>
        </div>
      ) : (
        <div className={cn('container')}>
          <GameMetaContainer
            startAt={fetchDateFormat(topic.startAt)}
            endAt={fetchDateFormat(topic.endAt)}
            title={topic.name}
            label={topic.name}
            status={roundStatus}
            isFinal={isFinal}
          />
          <div className={cn('game-container')}>
            <CanvasContainer
              type="double"
              source={[
                {
                  text: options[currentIndex[roundIndex]].name,
                  base: options[currentIndex[roundIndex]].imgUrl,
                  flip: options[currentIndex[roundIndex]].biggestImgUrl,
                },
                {
                  text: options[currentIndex[options.length - 1 - roundIndex]]
                    .name,
                  base: options[currentIndex[options.length - 1 - roundIndex]]
                    .imgUrl,
                  flip: options[currentIndex[options.length - 1 - roundIndex]]
                    .biggestImgUrl,
                },
              ]}
            />
            <CommentContainer topicId={id} />
          </div>
        </div>
      )}
    </CommentProvider>
  );
};

export default PlayClientPage;
