'use client';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { getStaticSrc } from '@/shared/utils/etc';
import ShareButton from '@/widgets/button/shareButton';
import React from 'react';

type Props = {
  buttonDirection: 'left' | 'down';
};

const ShareSocialsButton = ({ buttonDirection }: Props) => {
  return (
    <ShareButton
      direction={buttonDirection}
      startIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.SHARE)}
      closeIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.CLOSE)}
      otherIconImages={[
        getStaticSrc('icon', ICON_SRC_PATH.SRC.COPY),
        getStaticSrc('icon', ICON_SRC_PATH.SRC.LINK),
        getStaticSrc('icon', ICON_SRC_PATH.SRC.X),
      ]}
    />
  );
};

export default ShareSocialsButton;
