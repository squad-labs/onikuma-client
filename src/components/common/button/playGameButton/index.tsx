'use client';
import BaseButton from '@/widgets/button/baseButton';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

const PlayGameButton = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount()

  const renderButton = useMemo(() => {
    if (address && isConnected) return true;
    return false;    
  }, [address, isConnected])

  return (
    <BaseButton
      text={'Play Game'}
      theme={'fill'}
      colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
      label="play-game-button"
      role={'button'}
      shape={'shape-4'}
      fontSize={'large'}
      fontWeight={'regular'}
      loading={false}
      onClick={() => router.push('/p/current')}
      classNames={[]}
      disabled={!renderButton}
    />
  );
};

export default PlayGameButton;
