import React, { Fragment } from 'react';
import styles from '@/widgets/button/baseButton/BaseButton.module.scss';
import classNames from 'classnames/bind';
import { BaseButtonProps } from '@/shared/types/ui/Button';

const cn = classNames.bind(styles);

const BaseButton = ({
  text,
  shape,
  label,
  colors,
  theme,
  role = 'button',
  type = 'button',
  fontSize = 'medium',
  fontWeight = 'regular',
  disabled = false,
  onClick,
  loading,
  children = undefined,
  classNames = [],
  ...rest
}: BaseButtonProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      aria-label={label}
      role={role}
      disabled={disabled || loading}
      className={cn(
        'base-button-container',
        `${shape}-container`,
        `button-primary-${colors.primary}-${theme}`,
        `button-secondary-${colors.secondary}-${theme}`,
        ...classNames,
      )}
    >
      {loading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          {children && children}
          <span className={cn('text', `text-${fontSize}`, `text-${fontWeight}`)}>{text}</span>
        </Fragment>
      )}
    </button>
  );
};

export default BaseButton;
