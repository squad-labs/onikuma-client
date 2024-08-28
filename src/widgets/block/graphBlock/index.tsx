import React from 'react';
import styles from '@/widgets/block/graphBlock/GraphBlock.module.scss';
import classNames from 'classnames/bind';
import { ColorType } from '@/shared/types/ui/Color';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

type Props = {
  fillRatio: number;
  fillColor: ColorType;
};

const GraphBlock = ({ fillRatio, fillColor }: Props) => {
  const inlineStyle = {
    width: `${fillRatio}%`,
    height: '100%',
    backgroundColor: COLOR[fillColor],
    zIndex: 9,
    borderRight: fillRatio === 100 ? 'none' : `1px solid ${COLOR['DARK']}`,
  };
  return (
    <div className={cn('block-container')}>
      <div style={inlineStyle} />
    </div>
  );
};

export default GraphBlock;
