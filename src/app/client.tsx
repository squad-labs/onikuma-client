'use client';
import React from 'react';
import styles from '@/app/client.module.scss';
import classNames from 'classnames/bind';
import WalletConnectButton from '@/components/common/button/walletConnectButton';

const cn = classNames.bind(styles);

const HomeClient = () => {
  return <WalletConnectButton />;
};

export default HomeClient;
