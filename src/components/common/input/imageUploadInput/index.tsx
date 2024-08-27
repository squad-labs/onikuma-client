import React, { ChangeEvent, useCallback, useState } from 'react';
import styles from '@/components/common/input/imageUploadInput/ImageUploadInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const ImageUploadInput = () => {
  const [fileName, setFileName] = useState<string>('Hello, World');
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);

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
        type="image"
        accept="image/*"
        onChange={handleOnChange}
        className={cn('input')}
      />
      <label htmlFor="image-upload" className={cn('label')}>
        <span className={cn('label-text')}>Upload</span>
      </label>
    </div>
  );
};

export default ImageUploadInput;
