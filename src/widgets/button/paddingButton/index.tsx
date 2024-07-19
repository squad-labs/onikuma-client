import React from 'react'
import styles from '@/widgets/button/paddingButton/PaddingButton.module.scss'
import classNames from 'classnames/bind'
import { PaddingButtonProps } from '@/shared/types/ui/Button'

const cn = classNames.bind(styles)

const PaddingButton = ({
  name,
  onClick,
  disabled = false,
  type = 'button',
  height = 'medium',
  fontSize = 'medium',
  fontWeight = 'regular',
  children = undefined,
  classNames = [],
  ...rest
}: PaddingButtonProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      type={type}
      aria-label={name}
      disabled={disabled}
      className={cn('padding-button-container', `height-${height}`, ...classNames)}
    >
      {children && children}
      <span className={cn('text', `text-${fontSize}`, `text-${fontWeight}`)}>{name}</span>
    </button>
  )
}

export default PaddingButton
