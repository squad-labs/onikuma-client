'use client';
import React, { useMemo } from 'react';
import styles from '@/components/common/button/walletConnectButton/WalletConnectButton.module.scss';
import classNames from 'classnames/bind';
import BaseButton from '@/widgets/button/baseButton';
import { useConnect } from '@/shared/hooks/useConnect';
import { useAuth } from '@/shared/hooks/useAuth';

const cn = classNames.bind(styles);

type Props = {
  type: 'home' | 'header';
};

const WalletConnectButton = ({ type }: Props) => {
  const isHome = useMemo(() => type === 'home', [type]);
  useAuth({ autoLogin: true });
  const { handleOpen } = useConnect();

  return (
    <div className={cn(isHome && 'button-wrapper')}>
      <BaseButton
        text={'Connect Wallet to Start'}
        theme={'fill'}
        colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
        label="connect-wallet-button"
        role="button"
        shape={'shape-7'}
        fontSize={'large'}
        fontWeight={'regular'}
        loading={false}
        onClick={handleOpen}
        classNames={[]}
      />
    </div>
  );
};

export default WalletConnectButton;
