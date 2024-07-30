import React, { Fragment } from 'react';
import styles from '@/widgets/button/baseButton/BaseButton.module.scss';
import classNames from 'classnames/bind';
import { ButtonProps } from '@/shared/types/ui/Button';

const cn = classNames.bind(styles);

const BaseButton = ({
  name,
  shape,
  type = 'button',
  fontSize = 'small',
  fontWeight = 'regular',
  disabled = false,
  onClick,
  loading,
  children = undefined,
  classNames = [],
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      aria-label={name}
      disabled={disabled || loading}
      className={cn(
        'base-button-container',
        `${shape}-container`,
        ...classNames,
      )}
    >
      {loading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          {children && children}
          <span
            className={cn('text', `text-${fontSize}`, `text-${fontWeight}`)}
          >
            {name}
          </span>
        </Fragment>
      )}
    </button>
  );
};

export default BaseButton;
