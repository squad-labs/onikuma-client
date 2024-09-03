import React, { useState } from 'react';
import styles from '@/widgets/button/shareButton/ShareButton.module.scss';
import classNames from 'classnames/bind';
import { ShareButtonProps } from '@/shared/types/ui/Button';
import Image from 'next/image';

const cn = classNames.bind(styles);

const ShareButton = ({
  direction,
  startIconImage,
  closeIconImage,
  otherIconImages = [],
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(
        'share-button-container', `share-button-container${isOpen ? '-open' : '-closed'}-${direction}`,
      )}
    >
      <button
        className={cn(`${isOpen ? 'close-button' : 'main-button'}`)}
        onClick={toggleOpen}
      >
        {isOpen ? (
          <Image 
            src={closeIconImage}
            alt={'close-button'}
            width={24}
            height={24}
          />
        ) : (
          <Image 
            src={startIconImage} 
            alt=""
            width={24}
            height={24}
          />
        )}
      </button>
      <div className={cn('expanding-buttons')}>
        {otherIconImages.map((icon, index) => (
          <button key={index} className={cn('expandable-button')}>
            <Image 
              src={icon}
              alt={'expanding-button'}
              width={24}
              height={24}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareButton;
