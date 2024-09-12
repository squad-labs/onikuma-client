'use client';
import { WalletContext } from '@/context/partial/walletContext/WalletContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useAccount, type Config, useClient } from 'wagmi';
import { JsonRpcProvider } from 'ethers';
import { chain as AppChain, config } from '@/config/web3Config';
import { disconnect, switchChain } from '@wagmi/core';
import type { Chain, Client, Transport } from 'viem';
import axios from 'axios';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

export const useConnect = () => {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const [isClick, setIsClick] = useState<boolean>(false);

  const client = useClient<Config>({ chainId: AppChain.id });
  const { provider, setProvider } = useContext(WalletContext);
  const { address, isConnected, isConnecting, isDisconnected, isReconnecting } =
    useAccount();

  const handleModal = () => {
    if (address && isConnected) {
      handleAccountModal();
    } else {
      handleConnectModal();
    }
  };

  useEffect(() => {
    if (isClick && address && isConnected) {
      router.push('/p/current');
    }
  }, [isClick, address, isConnected]);

  const handleConnectModal = () => {
    setIsClick(true);
    try {
      if (openConnectModal) openConnectModal();
    } catch (e) {
      if (openConnectModal) openConnectModal();
      return e;
    }
  };

  const handleAccountModal = () => {
    try {
      if (openAccountModal) openAccountModal();
    } catch (e) {
      if (openAccountModal) openAccountModal();
      return e;
    }
  };

  const clientToProvider = (client: Client<Transport, Chain>) => {
    const { chain } = client;
    const network = {
      chainId: chain.id,
      name: chain.name,
    };

    const provider = new JsonRpcProvider(
      chain.rpcUrls.default.http[0],
      network,
    );
    setProvider(provider);
    return provider;
  };

  useEffect(() => {
    if (client && address && isConnected) {
      clientToProvider(client);
      try {
        if (client?.chain.id !== AppChain.id) {
          switchChain(config, { chainId: AppChain.id });
        }
      } catch (error) {
        axios.isAxiosError(error);
      }
    }
  }, [
    client,
    AppChain,
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  ]);

  const getProvider = useCallback(() => {
    return provider;
  }, [
    client,
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  ]);

  const getConnect = useCallback(() => {
    return {
      address,
      isConnected,
      isConnecting,
      isDisconnected,
      isReconnecting,
    };
  }, [
    client,
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  ]);

  const getChain = useCallback(() => {
    return client?.chain;
  }, [
    client,
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
  ]);

  const handleDisconnect = useCallback(async () => {
    await disconnect(config);
  }, []);

  return {
    handleModal,
    handleConnectModal,
    handleAccountModal,
    getProvider,
    getConnect,
    getChain,
    handleDisconnect,
  };
};
