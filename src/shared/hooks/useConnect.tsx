'use client';
import { WalletContext } from '@/context/partial/walletContext/WalletContext';
import { useCallback, useContext, useEffect } from 'react';
import { useAccount, type Config, useClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { chain as AppChain, config } from '@/config/web3Config';
import { disconnect, switchChain } from '@wagmi/core';
import type { Chain, Client, Transport } from 'viem';
import axios from 'axios';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';

export const useConnect = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const client = useClient<Config>({ chainId: AppChain.id });
  const { signer, setSigner, provider, setProvider } =
    useContext(WalletContext);
  const { address, isConnected, isConnecting, isDisconnected, isReconnecting } =
    useAccount();

  const handleModal = () => {
    if (address && isConnected) {
      handleAccountModal();
    } else {
      handleConnectModal();
    }
  };

  const handleConnectModal = () => {
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

    const provider = new BrowserProvider(window.ethereum, network);

    console.log('provider', provider);

    return provider;
  };

  const getAsyncSigner = async (provider: BrowserProvider, address: string) => {
    return await provider.getSigner(address);
  };

  useEffect(() => {
    if (client && address && isConnected) {
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

  useEffect(() => {
    if (client && address && isConnected) {
      const provider = clientToProvider(client);
      setProvider(provider);

      const _getSigner = async () => {
        const signer = await getAsyncSigner(provider, address);
        setSigner(signer);
      };
      _getSigner();
    }
  }, [
    client,
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

  const getSigner = useCallback(() => {
    return signer;
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
    getSigner,
    getConnect,
    getChain,
    handleDisconnect,
  };
};
