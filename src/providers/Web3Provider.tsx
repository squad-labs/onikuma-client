'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/config/web3Config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { structuralSharing } from '@wagmi/core/query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing,
    },
  },
});

type Props = {
  children: ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
