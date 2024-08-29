import React, { Fragment, useState } from 'react';
import styles from '@/widgets/button/shareButton/ShareButton.module.scss';
import classNames from 'classnames/bind';
import { ShareButtonProps } from '@/shared/types/ui/Button';

const cn = classNames.bind(styles);

const ShareButton = ({
  direction,
  startIconImage,
  closeIconImage,
  otherIconImages = [],
  ...rest
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(
        `share-button-container${isOpen ? '-open' : '-closed'}-${direction}`,
      )}
    >
      <button
        className={cn(`${isOpen ? 'close-button' : 'main-button'}`)}
        onClick={toggleOpen}
      >
        {isOpen ? (
          <img src={closeIconImage} />
        ) : (
          <img src={startIconImage} alt="" />
        )}
      </button>

      <div className={cn('expanding-buttons')}>
        {otherIconImages.map((icon, index) => (
          <button key={index} className={cn('expandable-button')}>
            <img src={icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareButton;
