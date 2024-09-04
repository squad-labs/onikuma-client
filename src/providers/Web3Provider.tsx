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
  defaultChain: berachainTestnetbArtio,
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
