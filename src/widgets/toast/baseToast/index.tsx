import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@/widgets/toast/baseToast/BaseToast.module.scss';
import classNames from 'classnames/bind';
import { BaseToastProps } from '@/shared/types/ui/Toast';
import { TOAST_SRC } from '@/shared/constants/TOAST_SRC';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { REMOVE_TOAST } from '@/context/global/slice/toastSlice';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const BaseToast = ({
  toastId,
  type,
  text,
  index,
  canClose,
  autoClose,
  children = undefined,
}: BaseToastProps) => {
  const [hide, setHide] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setHide(true);
    setTimeout(() => {
      dispatch(
        REMOVE_TOAST({
          toastId,
        }),
      );
    }, 500);
  }, [dispatch, toastId]);

  const preset = useMemo(() => {
    switch (type) {
      case 'success':
        return TOAST_SRC.SUCCESS;
      case 'error':
        return TOAST_SRC.ERROR;
      case 'info':
        return TOAST_SRC.INFO;
      case 'link':
        return TOAST_SRC.LINK;
      default:
        return TOAST_SRC.ERROR;
    }
  }, [type]);

  useEffect(() => {
    if (autoClose !== null) {
      setTimeout(() => {
        handleClose();
      }, autoClose.duration);
    }
  }, [toastId]);

  const isFirst = useMemo(() => index === 1, [index]);

  return (
    <div
      className={cn('toast-container', hide && 'toast-container-hide')}
      style={{
        transition: 'top 0.3s',
        top: `${isFirst ? index * 150 : index * 100 + 50}px`,
      }}
    >
      <Image
        src={preset.imageSrc}
        alt={`${type} icon`}
        className={cn('toast-icon')}
        width={120}
        height={120}
      />
      <div className={cn('toast-message', `toast-message-${type}`)}>
        <p>{text?.primaryText || preset.primaryText}</p>
        <p className={cn('toast-secondary-message')}>
          {text?.secondaryText || preset.secondaryText}
        </p>
        {children}
      </div>
      {canClose && (
        <button onClick={handleClose} className={cn('toast-close-button')}>
          <Image
            src={getStaticSrc('icon', ICON_SRC_PATH.SRC.CLOSE_TOAST)}
            alt="close-toast-icon"
            width={24}
            height={24}
            className={cn('close-icon')}
          />
        </button>
      )}
    </div>
  );
};

export default BaseToast;
