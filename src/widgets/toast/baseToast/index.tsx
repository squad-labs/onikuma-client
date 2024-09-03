import React, { useMemo } from 'react';
import styles from '@/widgets/toast/baseToast/BaseToast.module.scss';
import classNames from 'classnames/bind';
import { BaseToastProps } from '@/shared/types/ui/Toast';
import { TOAST_SRC } from '@/shared/constants/TOAST_SRC';
import Image from 'next/image';

const cn = classNames.bind(styles);

const BaseToast = ({
  type,
  message,
  secondaryMessage,
  closable = false,
  onClose,
  children = undefined,
  classNames = [],
  ...rest
}: BaseToastProps) => {

  const content = useMemo(() => {
    switch (type) {
      case 'success': return TOAST_SRC.SUCCESS
      case 'error': return TOAST_SRC.ERROR
      case 'requireAction': return TOAST_SRC.REQUIRE_ACTION
      default: return TOAST_SRC.ERROR
    }
  }, [type])

  return (
    <div className={cn('toast-container', ...classNames)}>
      <Image 
        src={content.imageSrc} 
        alt={`${type} icon`} 
        className={cn('toast-icon')}
        width={120}
        height={120}
      />
      <div
        className={cn('toast-message', `toast-message-${type}`, ...classNames)}
      >
        <p>{message || content.presetMessage}</p>
        <p className={cn('toast-secondary-message')}>
          {secondaryMessage || content.presetSecondaryMessage}
        </p>
        {children}
      </div>
      {closable && (
        <button 
          onClick={onClose} 
          className={cn('toast-close-button')}>
          &times;
        </button>
      )}
    </div>
  );
};

export default BaseToast;
