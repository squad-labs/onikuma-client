import React from 'react';
import styles from '@/widgets/spinner/baseSpinner/BaseSpinner.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  type: 'base' | 'global';
  color: 'primary' | 'light' | 'dark' | 'gray';
  size: number;
};

const Spinner = ({ type, size, color }: Props) => {
  return (
    <div
      className={cn(
        'container',
        type === 'global' ? 'container-global' : 'container-base',
      )}
    >
      <div style={{ width: size }} className={cn(`loader-${color}`)} />
    </div>
  );
};

export default Spinner;
