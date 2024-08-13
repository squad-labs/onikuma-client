import 'ress';
import '@/styles/globals.scss';
import ReduxProvider from '@/providers/ReduxProvider';
import AppProvider from '@/providers/AppProvider';
import Web3Provider from '@/providers/Web3Provider';
import { WalletProvider } from '@/context/walletContext/WalletProvider';
import Layout from '@/layout';

export const APP_STATE = process.env.STAGE;

console.log('APP_STATE', APP_STATE);

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
                <Layout>{children}</Layout>
              </AppProvider>
            </WalletProvider>
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
