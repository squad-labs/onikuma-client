import React, { useCallback, useRef } from 'react';
import styles from '@/components/common/modal/shareResultModal/ShareResultModal.module.scss';
import classNames from 'classnames/bind';
import { ShareResultModalProps } from '@/shared/types/ui/Modal';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import BaseModal from '@/widgets/modal/baseModal';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { IMAGE_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const ShareResultModal = ({
  topicId,
  title,
  roundText,
  dateText,
  option,
}: ShareResultModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = useCallback(() => {
    dispatch(CLOSE_MODAL());
  }, [dispatch]);

  useOnClickOutside({
    ref: modalRef,
    handler: handleCloseModal,
    mouseEvent: 'click',
  });
  return (
    <BaseModal background={'DARK_OPACITY_5'}>
      <div className={cn('modal-inner')} ref={modalRef}>
        <div className={cn('image-container')}>
          <div className={cn('header')}>
            <span className={cn('text')}>{title}</span>
            <Image
              src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.CHARACTER)}
              width={40}
              height={40}
              alt="character"
              className={cn(`character-left`)}
            />
            <Image
              src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.CHARACTER)}
              width={40}
              height={40}
              alt="character"
              className={cn(`character-right`)}
            />
          </div>
          <div className={cn('image-inner')}>
            <div className={cn('inner')}>
              <Image
                src={option.imageUrl}
                alt={option.name}
                priority
                quality={100}
                width={1200}
                height={1200}
                className={cn('image')}
              />
              <Image
                src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.TEXT_LOGO)}
                width={120}
                height={40}
                alt="text-logo"
                className={cn('text-logo')}
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ShareResultModal;
