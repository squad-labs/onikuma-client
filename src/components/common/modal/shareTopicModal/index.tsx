'use client';
import React, { useCallback, useRef } from 'react';
import styles from '@/components/common/modal/shareTopicModal/ShareTopicModal.module.scss';
import classNames from 'classnames/bind';
import BaseModal from '@/widgets/modal/baseModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getShareImage } from '@/shared/api/Image';
import Image from 'next/image';
import BaseText from '@/widgets/text/baseText';
import BaseButton from '@/widgets/button/baseButton';
import { ShareTopicModalProps } from '@/shared/types/ui/Modal';
import { Copy } from '@/shared/utils/clipboard';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice';

const cn = classNames.bind(styles);

const ShareTopicModal = ({
  topicId,
  title,
  roundText,
  dateText,
  options,
}: ShareTopicModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_SHARE_IMAGE],
    queryFn: () =>
      getShareImage({ topicId, title, roundText, dateText, options }),
  });

  const handleCopy = useCallback(() => {
    Copy({
      value: window.location.href,
      onSuccess: () => {},
      onError: () => {},
    });
  }, []);

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
        <p className={cn('modal-title')}>{'Share with your friends'}</p>
        <div className={cn('text-container')}>
          <BaseText
            text="Share it wherever you want including your X, TG, and etc."
            size="large"
            color="DARK_GRAY_2"
            weight="regular"
          />
        </div>
        <div className={cn('button-container')}>
          <BaseButton
            text="Copy Link"
            shape="shape-4"
            colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
            theme="fill"
            type="button"
            role="button"
            fontSize="large"
            fontWeight="bold"
            label="copy-link-button"
            onClick={() => handleCopy()}
          />
        </div>
        <div className={cn('image-container')}>
          {data && (
            <Image
              src={data}
              alt="share"
              fill={true}
              priority={true}
              className={cn('image')}
            />
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ShareTopicModal;
