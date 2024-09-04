import { berachainTestnetbArtio } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

export const PROJECT_ID = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || null;

if (!PROJECT_ID) {
  throw new Error('PROJECT_ID is required');
}

export const chain = berachainTestnetbArtio;

const metadata = {
  name: 'Onikuma',
  description: 'Onikuma',
  url: window.location.href,
  icons: [
    'https://dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com/%EC%8B%AC%EB%B3%BC0708+1.png',
  ],
};

export const wagmiConfig = defaultWagmiConfig({
  chains: [chain],
  projectId: PROJECT_ID,
  metadata,
  ssr: true,
  enableInjected: true,
  enableWalletConnect: false,
  enableCoinbase: false,
});
