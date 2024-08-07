import { Signer, Provider } from 'ethers';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface IWalletContext {
  signer: Signer | undefined;
  setSigner: Dispatch<SetStateAction<Signer | undefined>>;
  provider: Provider | undefined;
  setProvider: Dispatch<SetStateAction<Provider | undefined>>;
}

const defaultValue: IWalletContext = {
  signer: undefined,
  setSigner: () => {},
  provider: undefined,
  setProvider: () => {},
};

export const WalletContext = createContext<IWalletContext>(defaultValue);
