'use client';
import BaseButton from '@/widgets/button/baseButton';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

const DashBoardButton = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const connected = useMemo(() => {
    return isConnected && address;
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
