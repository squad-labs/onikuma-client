import React, { useCallback, useRef } from 'react'
import styles from '@/components/common/modal/shareResultModal/ShareResultModal.module.scss'
import classNames from 'classnames/bind'
import { ShareResultModalProps } from '@/shared/types/ui/Modal'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY'
import { getResultImage } from '@/shared/api/Image'
import { CLOSE_MODAL } from '@/context/global/slice/modalSlice'
import useOnClickOutside from '@/shared/hooks/useOnClick'
import { Copy } from '@/shared/utils/clipboard'
import BaseModal from '@/widgets/modal/baseModal'
import BaseText from '@/widgets/text/baseText'
import Image from 'next/image';
import BaseButton from '@/widgets/button/baseButton'

const cn = classNames.bind(styles)

const ShareResultModal = ({
  topicId,
  title,
  roundText,
  dateText,
  option
}: ShareResultModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.GET_RESULT_IMAGE],
    queryFn: () => getResultImage({ topicId, title, roundText, dateText, option }),
  })

  const handleCloseModal = useCallback(() => {
    dispatch(CLOSE_MODAL())
  }, [dispatch])

  const handleCopy = useCallback(() => {
    Copy({
      value: window.location.href,
      onSuccess: () => {},
      onError: () => {},
    });
  }, []);


  useOnClickOutside({ ref: modalRef, handler: handleCloseModal, mouseEvent: 'click' })
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
  )
}

export default ShareResultModal
