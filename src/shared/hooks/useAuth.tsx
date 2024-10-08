import { useConnect } from '@/shared/hooks/useConnect';
import { getTimezone } from '@/shared/utils/etc';
import { useEffect } from 'react';
import { userLogin } from '@/shared/api/Auth';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useAccount } from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';

type Props = {
  autoLogin?: boolean;
};

export const useAuth = ({ autoLogin = false }: Props) => {
  const { isConnected, address } = useAccount();
  const { handleDisconnect } = useConnect();

  const loginMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_LOGIN, address],
    mutationFn: userLogin,
    onSuccess: (data) => {
      setCookie('accessToken', data.accessToken);
    },
  });

  const login = async () => {
    if (!address || !isConnected) return;
    const timezone = getTimezone();

    loginMutation.mutate({ wallet: address, timezone });
  };

  const logout = async () => {
    deleteCookie('accessToken');
    localStorage.removeItem('onikuma-wallet-priority');
    handleDisconnect();
  };

  useEffect(() => {
    if (autoLogin) {
      const token = getCookie('accessToken');
      if (isConnected && address) {
        if (!token || token == 'undefined' || token == '') {
          login();
        }
      }
    }
  }, [isConnected, address, autoLogin]);

  return {
    login,
    logout,
  };
};
