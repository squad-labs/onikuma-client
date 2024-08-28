'use client';
import GameAlertBar from '@/components/common/bar/gameAlertBar';
import ShareResultModal from '@/components/common/modal/shareResultModal';
import {
  getAlertData,
  SET_ALERT_DATA,
} from '@/context/global/slice/alertSlice';
import { getModal } from '@/context/global/slice/modalSlice';
import { ActivityType } from '@/shared/types/data/activity';
import { ActivitySocketType } from '@/shared/types/etc/Socket';
import { fetchRelatedTime } from '@/shared/utils/date';
import React, { ReactNode, Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const alertData = useSelector(getAlertData);
  const modal = useSelector(getModal);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<ActivitySocketType | null>(null);

  useEffect(() => {
    const socket: ActivitySocketType = io(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity`,
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
      console.log('socket error', error);
    }

    function onConnect() {
      setIsConnected(true);
      console.log('socket connected');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('socket disconnected');
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

  useEffect(() => {
    console.log('socket app providers', socket);
    socket?.on('activity', (activity: ActivityType) => {
      console.log('game response', activity);
      dispatch(SET_ALERT_DATA(activity));
    });
  }, [socket, isConnected]);

  return (
    <Fragment>
      {children}
      {alertData.data?.map((item: ActivityType & { alertId: string }) => {
        return (
          <GameAlertBar
            key={item.alertId}
            alertId={item.alertId}
            address={item.userWallet}
            ticker={'HONEY'}
            amount={item.poolIn}
            pickerName={'HONEY'}
            createAt={`${fetchRelatedTime(item.createdAt)}`}
          />
        );
      })}
      {modal.name === 'ShareResultModal' &&
        modal.data &&
        'option' in modal.data && (
          <ShareResultModal
            topicId={modal.data.topicId}
            title={modal.data.title}
            roundText={modal.data.roundText}
            dateText={modal.data.dateText}
            option={modal.data.option}
          />
        )}
    </Fragment>
  );
};

export default AppProvider;
