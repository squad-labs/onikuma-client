'use client';
import BaseButton from '@/widgets/button/baseButton';
import React from 'react';

type CheckResultsButtonProps = {
  text: string;
  primaryColor: 'BASE_BLUE_1' | 'DARK_GRAY_5' | 'BASE_RED_1';
  secondaryColor: 'BASE_CREAM_1';
};

const CheckResultsButton = ({
  text,
  primaryColor,
  secondaryColor,
}: CheckResultsButtonProps) => {
  return (
    <BaseButton
      text={text}
      theme={'fill'}
      colors={{ primary: primaryColor, secondary: secondaryColor }}
      label="check-results-button"
      role={'button'}
      shape={'shape-4'}
      fontSize={'medium'}
      fontWeight={'regular'}
      loading={false}
      onClick={() => console.log('${text} button clicked')}
      classNames={[]}
    />
  );
};

export default CheckResultsButton;
