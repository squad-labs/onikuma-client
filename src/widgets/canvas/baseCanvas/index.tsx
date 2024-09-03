import React from 'react';
import styles from '@/widgets/canvas/baseCanvas/BaseCanvas.module.scss';
import classNames from 'classnames/bind';
import { BaseCanvasProps } from '@/shared/types/ui/Canvas';
import Image from 'next/image';

const cn = classNames.bind(styles);

const BaseCanvas = ({ bgImage, name, width, height }: BaseCanvasProps) => {
  return (
    <div className={cn('container')}>
      <Image
        src={bgImage}
        alt={name}
        width={width}
        height={height}
        className={cn('image')}
      />
    </div>
  );
};

export default BaseCanvas;
