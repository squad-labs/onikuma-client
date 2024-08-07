import React, { Fragment } from 'react'
import styles from '@/styles/widgets/bar/baseBar/BaseBar.module.scss';
import classNames from 'classnames/bind';
import { BaseBarProps } from '@/shared/types/ui/Bar';

const cn = classNames.bind(styles);

const BaseBar = ({
  label,
  text,
  role = 'article',
  size,
  fontSize = 'medium',
  fontWeight = 'regular',
  loading = false,
  children = undefined,
  classNames = [],
}: BaseBarProps) => {
  return (
    <div
      aria-label={label}
      role={role}
      className={cn('bar-container', `bar-size-${size}`, ...classNames)}
    >
      {loading ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          {children && children}
          <span
            className={cn(
              'text',
              `text-size-${fontSize}`,
              `text-weight-${fontWeight}`,
            )}
          >
            {text}
          </span>
        </Fragment>
      )}     
    </div>
  )
}

export default BaseBar
