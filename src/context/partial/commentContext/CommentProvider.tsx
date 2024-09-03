'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { CommentContext } from '@/context/partial/commentContext/CommentContext';
import { CommentSocketType } from '@/shared/types/etc/Socket';
import { io } from 'socket.io-client';

type Props = {
  children: ReactNode;
  id: string;
};

const CommentProvider = ({ children }: Props) => {
  const [comment, setComment] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<CommentSocketType | null>(null);

  useEffect(() => {
    const socket: CommentSocketType = io(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment`,
      {
        transports: ['websocket'],
        addTrailingSlash: true,
        rejectUnauthorized: false,
        agent: false,
        upgrade: false,
      },
    ).connect();

    setSocket(socket);

    function onError(error: Error) {
      throw new Error(error.message);
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('error', onError);

      socket.disconnect();
    };
  }, []);

  return (
    <CommentContext.Provider
      value={{ comment, setComment, socket, isConnected }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider };
