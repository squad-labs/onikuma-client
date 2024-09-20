'use client';
import React from 'react';
import GoHomeButton from '@/widgets/button/paddingButton';
import { useRouter } from 'next/navigation';

const ErrorButton = () => {
  const router = useRouter();
  return (
    <GoHomeButton
      name="Go Back Home"
      text="Go Back Home"
      label="BackHome Button"
      height="medium"
      fontSize="large"
      fontWeight="regular"
      onClick={() => router.replace('/')}
      classNames={['button-blue']}
    />
  );
};

export default ErrorButton;
