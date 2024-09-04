'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { State, WagmiProvider } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { PROJECT_ID, wagmiConfig } from '@/config/web3Config';
import { berachainTestnetbArtio } from 'wagmi/chains';

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: PROJECT_ID,
  allWallets: 'HIDE',
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
  allowUnsupportedChain: true,
  defaultChain: berachainTestnetbArtio,
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709', // OKX
  ],
});

type Props = {
  children: ReactNode;
  initialState?: State;
};

const Web3Provider = ({ children, initialState }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default Web3Provider;
