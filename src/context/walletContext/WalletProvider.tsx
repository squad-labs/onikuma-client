'use client';
import { Signer, Provider } from 'ethers';
import { ReactNode, useState } from 'react';
import { WalletContext } from '@/context/walletContext/WalletContext';

type Props = {
  children: ReactNode;
};

const WalletProvider = ({ children }: Props) => {
  const [signer, setSigner] = useState<Signer | undefined>(undefined);
  const [provider, setProvider] = useState<Provider | undefined>(undefined);

  return (
    <WalletContext.Provider
      value={{ signer, setSigner, provider, setProvider }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider };