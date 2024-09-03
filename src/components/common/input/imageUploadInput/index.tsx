import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import styles from '@/components/common/input/imageUploadInput/ImageUploadInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  imageFile: File | Blob | null;
  setImageFile: Dispatch<SetStateAction<File | Blob | null>>;
};

const ImageUploadInput = ({ fileName, setFileName, setImageFile }: Props) => {
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileName(file.name);
        setImageFile(file);
      };
    }
  }, []);

  return (
    <div className={cn('input-container')}>
      <p className={cn('file-name')}>{fileName || ''}</p>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(event) => handleOnChange(event)}
        className={cn('input')}
      />
      <label htmlFor="image-upload" className={cn('label')}>
        <span className={cn('label-text')}>Upload</span>
      </label>
    </div>
  );
};

export default ImageUploadInput;
