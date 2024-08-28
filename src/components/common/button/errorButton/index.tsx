'use client';
import React from 'react';
import GoHomeButton from '@/widgets/button/paddingButton';

const ErrorButton = () => {
  return (
    <GoHomeButton
      name="Go Back Home"
      text="Go Back Home"
      label="BackHome Button"
      height="medium"
      fontSize="large"
      fontWeight="regular"
      onClick={() => console.log('Button Clicked')}
      classNames={['button-blue']}
    />
  );
};

export default ErrorButton;
