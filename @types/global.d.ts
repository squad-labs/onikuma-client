import { Eip1193Provider } from 'eip1193-provider';
import type { WindowProvider } from 'wagmi/window';

export interface ExtendEthereum extends Eip1193Provider {
  isSafePal?: true;
  isCoin98?: true;
  isBlocto?: true;
  isMathWallet?: true;
  isTrustWallet?: true;
  isBlocto?: true;
  isBinance?: true;
  isCoinbaseWallet?: true;
  isTrust?: true;
  isTokenPocket?: true;
  isMetaMask?: true;
  providers?: ExtendEthereum[];
  isOpera?: true;
  isBraveWallet?: true;
  isRabby?: true;
}

export declare global {
  interface Window {
    okxwallet?: WindowProvider;
    coin98?: true;
    mercuryoWidget?: any;
    ethereum?: Eip1193Provider;
    BinanceChain?: {
      bnbSign?: (
        address: string,
        message: string,
      ) => Promise<{ publicKey: string; signature: string }>;
      switchNetwork?: (networkId: string) => Promise<string>;
    } & Ethereum;
  }
}
