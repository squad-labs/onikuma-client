import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/components/common/card/uploadImageCard/UploadImageCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import ImageUploadInput from '@/components/common/input/imageUploadInput';
import BaseButton from '@/widgets/button/baseButton';
import { COLOR } from '@/shared/constants/COLOR';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { postFlipImage } from '@/shared/api/Image';
import { useDispatch } from 'react-redux';
import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import Image from 'next/image';
import IconButton from '@/widgets/button/iconButton';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

type Props = {
  index: number;
  topicId: string;
  pickerName: string;
  setSkip: () => void;
  setFlip: () => void;
  withBorder: boolean;
  withbackGround: boolean;
  isFlip: boolean;
  baseImage: string;
  isSkip: boolean;
  flipImage?: string;
};

const UploadImageCard = ({
  index,
  topicId,
  pickerName,
  setSkip,
  setFlip,
  withBorder,
  withbackGround,
  isFlip,
  isSkip,
  baseImage,
  flipImage,
}: Props) => {
  const [width, setWidth] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const dispatch = useDispatch();

  const uploadImageMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_UPLOAD_IMAGE],
    mutationFn: postFlipImage,
    onSuccess: (data) => {
      dispatch(
        SET_TOAST({
          type: 'success',
          text: TOAST_RESPONSE.UPLOAD_IMAGE.SUCCESS,
          canClose: true,
          autoClose: {
            duration: 3000,
          },
        }),
      );
      setFileName('');
    },
  });

  const handleUploadImage = useCallback(() => {
    if (imageFile) {
      uploadImageMutation.mutate({
        topicId: topicId,
        file: imageFile,
        pickerName: pickerName,
      });
    }
  }, [fileName, pickerName, imageFile, index]);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cn('upload-image-wrapper', isSkip && 'skip')}>
      <div className={cn('card-wrapper')}>
        <div
          className={cn('card-container')}
          style={{
            border: withBorder ? `1px solid ${COLOR['DARK']}` : 'none',
            backgroundColor: withbackGround ? COLOR['LIGHT'] : 'transparent',
          }}
        >
          {width > 820 ? (
            <BaseText
              text={`You pooled in the biggest for ${pickerName}!`}
              color="DARK"
              size="large"
              weight="bold"
            />
          ) : (
            <BaseText
              text={`You pooled in the biggest for ${pickerName}!`}
              color="DARK"
              size="medium"
              weight="bold"
            />
          )}
          <div className={cn('text-container')}>
            <BaseText
              text="Celebrate your contribution with custom images!"
              color="DARK_GRAY_2"
              size="medium"
              weight="regular"
            />
            <BaseText
              text="They are shown to all players throughout the gameplay."
              color="DARK_GRAY_2"
              size="medium"
              weight="regular"
            />
          </div>
          <div className={cn('input-wrapper')}>
            <ImageUploadInput
              index={index}
              fileName={fileName}
              setFileName={setFileName}
              imageFile={imageFile}
              setImageFile={setImageFile}
            />
          </div>
          <div className={cn('button-wrapper')}>
            <BaseButton
              disabled={!imageFile}
              text="Confirm"
              shape="shape-4"
              role="button"
              label="image-confirm-button"
              colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
              theme="fill"
              fontSize="large"
              fontWeight="regular"
              onClick={() => handleUploadImage()}
            />
            <BaseButton
              text="Skip this"
              shape="shape-4"
              role="button"
              label="image-confirm-button"
              colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
              theme="outline"
              fontSize="large"
              fontWeight="regular"
              onClick={() => setSkip()}
            />
          </div>
        </div>
      </div>
      <div className={cn('image-wrapper', 'flip-wrapper')}>
        <div className={cn('background')} />
        {isFlip ? (
          <Image
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : flipImage
                  ? flipImage
                  : baseImage
            }
            alt={pickerName}
            width={1200}
            height={1200}
            priority
            className={cn('image', 'unflipped')}
          />
        ) : (
          <Image
            src={baseImage}
            alt={pickerName}
            width={1200}
            height={1200}
            priority
            className={cn('image', 'flipped')}
          />
        )}
        <div className={cn('button-container')}>
          <IconButton
            name="flip-button"
            onClick={() => setFlip()}
            shape="round"
            height={'small'}
            classNames={[isFlip ? 'button-white' : 'button-blue']}
          >
            <div className={cn('button-inner')}>
              <Image
                src={getStaticSrc(
                  'icon',
                  isFlip ? ICON_SRC_PATH.SRC.FLIP_FILL : ICON_SRC_PATH.SRC.FLIP,
                )}
                alt="share"
                width={24}
                height={22}
                priority
                quality={100}
                className={cn('flip-icon')}
              />
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UploadImageCard;
