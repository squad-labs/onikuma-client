'use client';
import { WalletContext } from '@/context/walletContext/WalletContext';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useCallback, useContext, useEffect } from 'react';
import { useAccount, type Config, useClient } from 'wagmi';
import type { Chain, Client, Transport } from 'viem';
import { BrowserProvider } from 'ethers';
import { chain as AppChain } from '@/config/web3Config';
import { switchChain } from '@wagmi/core';
import { wagmiConfig } from '@/config/web3Config';

export const useConnect = () => {
  const { open, close } = useWeb3Modal();
  const client = useClient<Config>({ chainId: AppChain.id });
  const { signer, setSigner, provider, setProvider } =
    useContext(WalletContext);
  const { address, isConnected, isConnecting, isDisconnected, isReconnecting } =
    useAccount();

  const handleOpen = () => {
    try {
      open();
    } catch (e) {
      open();
    }
  };

  const handleClose = () => {
    try {
      close();
    } catch (e) {
      close();
    }
  };

  const clientToProvider = (client: Client<Transport, Chain>) => {
    const { chain } = client;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };

    return new BrowserProvider(window.ethereum, network);
  };

  const getAsyncSigner = async (provider: BrowserProvider, address: string) => {
    return await provider.getSigner(address);
  };

  useEffect(() => {
    if (client?.chain.id !== AppChain.id) {
      switchChain(wagmiConfig, { chainId: AppChain.id });
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

  return {
    handleOpen,
    handleClose,
    getProvider,
    getSigner,
    getConnect,
    getChain,
  };
};
