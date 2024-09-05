import { berachainTestnetbArtio } from 'wagmi/chains';
import { cookieStorage, createStorage } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const PROJECT_ID = '8e39a17b39827f78c1e26dafe972c92f';

if (!PROJECT_ID) {
  throw new Error('PROJECT_ID is required');
}

export const chain = berachainTestnetbArtio;

const metadata = {
  name: 'Onikuma',
  description: 'Onikuma',
  url: 'https://onikuma-dev.vercel.app',
  icons: [
    'https://dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com/%EC%8B%AC%EB%B3%BC0708+1.png',
  ],
};

export const config = getDefaultConfig({
  appName: metadata.name,
  projectId: PROJECT_ID,
  chains: [chain],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
