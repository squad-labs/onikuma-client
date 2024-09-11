import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
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

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  pickerName: string;
  imageFile: File | Blob | null;
  setImageFile: Dispatch<SetStateAction<File | Blob | null>>;
  setSkip: () => void;
  withBorder: boolean;
  withbackGround: boolean;
};

const UploadImageCard = ({
  topicId,
  pickerName,
  imageFile,
  setImageFile,
  setSkip,
  withBorder,
  withbackGround,
}: Props) => {
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
  }, [fileName, imageFile]);

  return (
    <div
      className={cn('card-container')}
      style={{
        border: withBorder ? `1px solid ${COLOR['DARK']}` : 'none',
        backgroundColor: withbackGround ? COLOR['LIGHT'] : 'transparent',
      }}
    >
      <BaseText
        text={`You pooled in the biggest for ${pickerName}!`}
        color="DARK"
        size="large"
        weight="bold"
      />
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
  );
};

export default UploadImageCard;
