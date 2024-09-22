import 'ress';
import '@/styles/globals.scss';
import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReduxProvider from '@/providers/ReduxProvider';
import AppProvider from '@/providers/AppProvider';
import Web3Provider from '@/providers/Web3Provider';
import { WalletProvider } from '@/context/partial/walletContext/WalletProvider';
import Layout from '@/layout';
import { GoogleAnalytics } from '@/shared/libs/ga';

export const APP_STATE = process.env.STAGE;

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Web3Provider>
            <WalletProvider>
              <AppProvider>
                {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
                <Layout>{children}</Layout>
                <section id="modal-root" />
              </AppProvider>
            </WalletProvider>
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
