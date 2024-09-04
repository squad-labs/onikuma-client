'use client';
import ShareButton from '@/widgets/button/shareButton';
import React from 'react';

type Props = {
  buttonDirection: 'left' | 'down';
};

const ShareSocialsButton = ({ buttonDirection }: Props) => {
  return (
    <ShareButton
      direction={buttonDirection}
      startIconImage="/icons/share-icon.svg"
      closeIconImage="/icons/close-icon.svg"
      otherIconImages={[
        '/icons/copy-icon.svg',
        '/icons/link-icon.svg',
        '/icons/x-icon.svg',
      ]}
      links={[
        '',
        'SHARE_CURRENT_LINK',
        'SHARE_TWEET_X'
      ]}
    />
  );
};

export default ShareSocialsButton;
