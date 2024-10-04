'use client';
import BaseButton from '@/widgets/button/baseButton';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

const DashBoardButton = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const token = getCookie('accessToken');

  const connected = useMemo(() => {
    return isConnected && address && token && token != 'undefined';
  }, [isConnected, address]);

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
      onClick={() => router.push(`/d/ongoing`)}
      classNames={[]}
      disabled={!connected}
    />
  );
};

export default DashBoardButton;
