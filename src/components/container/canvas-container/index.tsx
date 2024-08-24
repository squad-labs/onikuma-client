import React, { useCallback, useContext } from 'react';
import styles from '@/components/container/canvas-container/CanvasContainer.module.scss';
import classNames from 'classnames/bind';
import ImageOptionCard from '@/components/common/card/imageOptionCard';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';

const cn = classNames.bind(styles);

type Props = {
  type: 'single' | 'double';
  source: {
    text: string;
    base: string;
    flip?: string;
  }[];
};

const CanvasContainer = ({ type, ...rest }: Props) => {
  const { next } = useContext(RoundContext);
  const handleSelect = useCallback(
    (text: string) => {
      next(text);
    },
    [type, rest],
  );

  if (type === 'single') {
    return (
      <div className={cn(`${type}-container`)}>
        <ImageOptionCard
          type={'single'}
          text={rest.source[0].text}
          base={rest.source[0].base}
          flip={rest.source[0].flip}
          onClick={() => {}}
        />
      </div>
    );
  }
  return (
    <div className={cn(`${type}-container`)}>
      <ImageOptionCard
        type={'double'}
        text={rest.source[0].text}
        base={rest.source[0].base}
        flip={rest.source[0].flip}
        onClick={() => handleSelect(rest.source[0].text)}
      />
      <span className={cn('text')}>VS</span>
      <ImageOptionCard
        type={'double'}
        text={rest.source[1].text}
        base={rest.source[1].base}
        flip={rest.source[1].flip}
        onClick={() => handleSelect(rest.source[1].text)}
      />
    </div>
  );
};

export default CanvasContainer;
