'use client';
import { GameSocketType } from '@/shared/types/etc/Socket';
import React, { ReactNode, Fragment, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket: GameSocketType = io(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity`,
      {
        transports: ['websocket'],
        addTrailingSlash: true,
        rejectUnauthorized: false,
        agent: false,
        upgrade: false,
      },
    ).connect();
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default AppProvider;
