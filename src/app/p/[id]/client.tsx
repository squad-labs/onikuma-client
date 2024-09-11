'use client';
import React, { Suspense, useContext, useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { getModal } from '@/context/global/slice/modalSlice';
import ShareTopicModal from '@/components/common/modal/shareTopicModal';
import PoolInModal from '@/components/common/modal/poolInModal';

const cn = classNames.bind(styles);

type Props = {
  id: string;
  topic: Topic;
};

const PlayClientPage = ({ id, topic }: Props) => {
  const [tokenPrice, setTokenPrice] = useState<string>('');
  const { ticker, getTokenPrice, options, currentIndex } =
    useContext(RoundContext);
  const { roundIndex, roundStatus, isFinal } = useRound(RoundContext);
  const modal = useSelector(getModal);

  useEffect(() => {
    const _getTokenPrice = async () => {
      try {
        const token = await getTokenPrice('1');
        setTokenPrice(String(token));
      } catch (err) {
        return err;
      }
    };
    _getTokenPrice();
  }, []);

  return (
    <CommentProvider id={id}>
      {isFinal ? (
        <div className={cn(`final-container`)}>
          <CanvasContainer
            type={'single'}
            title={topic.name}
            topicId={id}
            roundText={roundStatus}
            dateText={fetchDateFormat(topic.startAt)}
            source={[
              {
                text: options[0].name,
                base: options[0].imgUrl,
                flip: options[0].biggestImgUrl,
              },
            ]}
            amount={tokenPrice}
          />
          <div className={cn('info-container')}>
            <GameMetaContainer
              topicId={id}
              startAt={fetchDateFormat(topic.startAt)}
              endAt={fetchDateFormat(topic.endAt)}
              title={options[0].name}
              status={roundStatus}
              label={topic.name}
              isFinal={isFinal}
            />
            <Suspense>
              <FinalOptionCard
                topicId={id}
                title={topic.name}
                value={options[0].name}
                imageUrl={options[0].imgUrl}
                poolAmount={1000}
                baseTokenName={'HONEY'}
                baseTicker={'HONEY'}
                baseTokenPrice={'1'}
                roundTokenName={ticker}
                roundTicker={ticker}
                roundTokenPrice={tokenPrice}
              />
            </Suspense>
          </div>
        </div>
      ) : (
        <div className={cn('container')}>
          <GameMetaContainer
            topicId={id}
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
              title={topic.name}
              topicId={id}
              roundText={roundStatus}
              dateText={fetchDateFormat(topic.startAt)}
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
              amount={tokenPrice}
            />
            <CommentContainer topicId={id} />
          </div>
        </div>
      )}
      {modal.name === 'ShareTopicModal' &&
        modal.data &&
        'options' in modal.data && (
          <ShareTopicModal
            topicId={modal.data.topicId}
            title={modal.data.title}
            roundText={modal.data.roundText}
            dateText={modal.data.dateText}
            options={modal.data.options}
          />
        )}
      {modal.name === 'PoolInModal' &&
        modal.data &&
        'baseTicker' in modal.data && (
          <PoolInModal
            topicId={modal.data.topicId}
            title={modal.data.title}
            value={modal.data.value}
            imageUrl={modal.data.imageUrl}
            baseTicker={modal.data.baseTicker}
            baseTokenName={modal.data.baseTokenName}
            roundTicker={modal.data.roundTicker}
            roundTokenName={modal.data.roundTokenName}
          />
        )}
    </CommentProvider>
  );
};

export default PlayClientPage;
