import React, { Fragment } from 'react';
import styles from '@/widgets/toast/baseToast/BaseToast.module.scss';
import classNames from 'classnames/bind';
import { BaseToastProps } from '@/shared/types/ui/Toast';

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
  let imageSrc = '';
  let presetMessage = '';
  let presetSecondaryMessage = '';
  if (type === 'success') {
    imageSrc = '/images/toast-success.svg';
    presetMessage = 'Saved successfully';
    presetSecondaryMessage = 'Your changes have been saved successfully';
  } else if (type === 'error') {
    imageSrc = '/images/toast-error.svg';
    presetMessage = 'Error occurred';
    presetSecondaryMessage =
      'Connection error. Unable to connect to the server at present';
  } else if (type === 'requireAction') {
    imageSrc = '/images/toast-actionreq.svg';
    presetMessage = 'Action required';
    presetSecondaryMessage =
      'Incomplete fields. Please fill in all required information now';
  }

  return (
    <div className={cn('toast-container', ...classNames)}>
      {imageSrc && (
        <img src={imageSrc} alt={`${type} icon`} className={cn('toast-icon')} />
      )}
      <div
        className={cn('toast-message', `toast-message-${type}`, ...classNames)}
      >
        <p>{message || presetMessage}</p>
        <p className={cn('toast-secondary-message')}>
          {secondaryMessage || presetSecondaryMessage}
        </p>
        {children}
      </div>
      {closable && (
        <button onClick={onClose} className={cn('toast-close-button')}>
          &times;
        </button>
      )}
    </div>
  );
};

export default BaseToast;
