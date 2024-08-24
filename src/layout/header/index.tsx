import React from 'react';
import styles from '@/layout/header/Header.module.scss';
import classNames from 'classnames/bind';
import HeaderLogo from '@/components/common/logo/headerLogo';
import DashBoardButton from '@/components/common/button/dashBoardButton';
import PlayGameButton from '@/components/common/button/playGameButton';
import { cookies } from 'next/headers';
import { getTopicByStatus } from '@/shared/api/Topics';
import { TestToken } from '@/shared/constants/TEST';
import { TopicMetadata } from '@/shared/types/data/topic';
import dynamic from 'next/dynamic';

const GameRelayBar = dynamic(
  () => import('@/components/common/bar/gameRelayBar'),
  { ssr: false },
);

const cn = classNames.bind(styles);

const Header = async () => {
  const cookie = cookies().get('token');
  const res = await getTopicByStatus('onGoing', TestToken);
  const data: TopicMetadata = res[0];

  return (
    <header className={cn('header-container')}>
      <div className={cn('header-wrapper')}>
        <div className={cn('header-inner')}>
          <HeaderLogo />
          <div className={cn('bar-wrapper')}>
            <GameRelayBar endDate={data.endAt} />
          </div>
        </div>
        <div className={cn('header-inner')}>
          <DashBoardButton id={data._id} />
          <PlayGameButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
