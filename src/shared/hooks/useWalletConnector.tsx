export const useWalletConnector = () => {
  const getProviderByPriority = () => {
    const priority = localStorage.getItem('onikuma-wallet-priority');

    switch (priority) {
      case 'com.okex.wallet':
        return window.okxwallet;
      case 'io.metamask':
        return window.ethereum;
      default:
        return window.ethereum;
    }
  };

  return {
    getProviderByPriority,
  };
};
