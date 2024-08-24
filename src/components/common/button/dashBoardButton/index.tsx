'use client';
import BaseButton from '@/widgets/button/baseButton';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: string;
};

const DashBoardButton = ({ id }: Props) => {
  const router = useRouter();

  return (
    <BaseButton
      text={'Dashboard'}
      theme={'outline'}
      colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
      label="dashboard-button"
      role={'button'}
      shape={'shape-4'}
      fontSize={'large'}
      fontWeight={'regular'}
      loading={false}
      onClick={() => router.push(`/d/${id}`)}
      classNames={[]}
    />
  );
};

export default DashBoardButton;
