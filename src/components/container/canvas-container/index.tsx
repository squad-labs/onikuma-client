import React, { useCallback, useContext } from 'react';
import styles from '@/components/container/canvas-container/CanvasContainer.module.scss';
import classNames from 'classnames/bind';
import ImageOptionCard from '@/components/common/card/imageOptionCard';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { postVote } from '@/shared/api/Activity';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  roundText: string;
  dateText: string;
  title: string;
  amount?: string;
  type: 'single' | 'double';
  source: {
    text: string;
    base: string;
    flip?: string;
  }[];
};

const CanvasContainer = ({
  topicId,
  roundText,
  dateText,
  title,
  amount = '',
  type,
  ...rest
}: Props) => {
  const { next } = useContext(RoundContext);

  const handleSelect = useCallback(
    (text: string) => {
      next(text);
      const loser = rest.source.find((source) => source.text !== text);

      if (loser) {
        voteMutation.mutate({
          topicId,
          winner: text,
          loser: loser?.text,
        });
      }
    },
    [type, rest],
  );

  const voteMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_VOTE, topicId, roundText],
    mutationFn: postVote,
    onSuccess: () => {},
  });

  if (type === 'single') {
    return (
      <div className={cn(`${type}-container`)}>
        <ImageOptionCard
          type={'single'}
          topicId={topicId}
          roundText={roundText}
          dateText={dateText}
          title={title}
          text={rest.source[0].text}
          base={rest.source[0].base}
          flip={rest.source[0].flip}
          amount={amount}
          onClick={() => {}}
        />
      </div>
    );
  }
  return (
    <div className={cn(`${type}-container`)}>
      <ImageOptionCard
        type={'double'}
        topicId={topicId}
        roundText={roundText}
        dateText={dateText}
        title={title}
        text={rest.source[0].text}
        base={rest.source[0].base}
        flip={rest.source[0].flip}
        amount={amount}
        onClick={() => {
          handleSelect(rest.source[0].text);
        }}
      />
      <span className={cn('text')}>VS</span>
      <ImageOptionCard
        type={'double'}
        topicId={topicId}
        roundText={roundText}
        dateText={dateText}
        title={title}
        text={rest.source[1].text}
        base={rest.source[1].base}
        flip={rest.source[1].flip}
        amount={amount}
        onClick={() => {
          handleSelect(rest.source[1].text);
        }}
      />
    </div>
  );
};

export default CanvasContainer;
