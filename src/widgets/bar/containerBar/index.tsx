import React, { Fragment } from 'react'
import styles from '@/widgets/bar/containerBar/ContainerBar.module.scss'
import classNames from 'classnames/bind'
import { ContainerBarProps } from '@/shared/types/ui/Bar'

const cn = classNames.bind(styles)

const ContainerBar = ({
  label,
  role = 'article',
  children,
  size,
  loading = false,
  classNames = [],
}: ContainerBarProps) => {
  return (
    <div
      aria-label={label}
      role={role}
      className={cn('bar-container', `bar-size-${size}`, ...classNames)}
    >
      {loading ? <Fragment></Fragment> : children}
    </div>
  )
}

export default ContainerBar
