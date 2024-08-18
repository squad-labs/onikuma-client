import React from 'react';
import styles from '@/widgets/button/iconButton/IconButton.module.scss';
import classNames from 'classnames/bind';
import { IconButtonProps } from '@/shared/types/ui/Button';

const cn = classNames.bind(styles);

const IconButton = ({
  name,
  onClick,
  disabled = false,
  shape,
  type = 'button',
  text = '',
  height,
  children = undefined,
  classNames = [],
  ...rest
}: IconButtonProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      aria-label={name}
      disabled={disabled}
      className={cn(
        'icon-button-container',
        `shape-${shape}`,
        `height-${height}`,
        ...classNames,
      )}
    >
      <div className={cn('image-wrapper')}>
        <img src="" alt="" className={cn('button-image')} />
      </div>
      {text && <span className={cn('button-text')}>{text}</span>}
      {children}
    </button>
  );
};

export default IconButton;
