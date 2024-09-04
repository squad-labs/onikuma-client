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
  links = [],
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleButtonClick = (link: string) => {
    if (link === 'SHARE_CURRENT_LINK') {
      navigator.clipboard.writeText(window.location.href)
    }
    else if (link === 'SHARE_TWEET_X') {
      const tweetText = encodeURIComponent("Check this out at Onikuma!");
      const tweetUrl = encodeURIComponent(window.location.href);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
      window.open(twitterUrl, '_blank');
    }
    else if (link) {
      window.open(link, '_blank');
    }
  }

  return (
    <div
      className={cn(
        'share-button-container',
        `share-button-container${isOpen ? '-open' : '-closed'}-${direction}`,
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
          <Image src={startIconImage} alt="" width={24} height={24} />
        )}
      </button>
      <div className={cn('expanding-buttons')}>
        {otherIconImages.map((icon, index) => (
          <button 
          key={index} 
          className={cn('expandable-button')}
          onClick = {()=> handleButtonClick(links[index])}>
            <Image src={icon} alt={'expanding-button'} width={24} height={24} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareButton;
