'use client';
import BaseButton from '@/widgets/button/baseButton';
import React from 'react';

type CheckResultsButtonProps = {
    text: string;
    primaryColor: 'BASE_BLUE_1' | 'BASE_GRAY_1' | 'BASE_RED_1';
    secondaryColor: 'LIGHT';
}

const CheckResultsButton = ({text, primaryColor, secondaryColor}: CheckResultsButtonProps) => {
  return (
    <BaseButton
      text={text}
      theme={'outline'}
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
