'use client';
import BaseButton from '@/widgets/button/baseButton';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/common/button/walletConnectButton';

const PlayGameButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const [mounting, setMounting] = useState<boolean>(true);

  useEffect(() => {
    if (mounting) {
      setMounting(false);
    }
    return () => setMounting(true);
  }, []);

  const renderButton = useMemo(() => {
    if (address && isConnected) return true;
    return false;
  }, [address, isConnected]);

  const handleRenderByRoute = useCallback(() => {
    if (mounting) return null;
    if (pathname === '/') {
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
    } else {
      if (renderButton) {
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
          />
        );
      } else {
        return <WalletConnectButton type={'header'} autoLogin={false} />;
      }
    }
  }, [mounting, router, address, isConnected]);

  return handleRenderByRoute();
};

export default PlayGameButton;
