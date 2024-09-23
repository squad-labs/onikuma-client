import React, { Suspense } from 'react';
import styles from '@/layout/header/Header.module.scss';
import classNames from 'classnames/bind';
import HeaderLogo from '@/components/common/logo/headerLogo';
import DashBoardButton from '@/components/common/button/dashBoardButton';
import PlayGameButton from '@/components/common/button/playGameButton';
import { getTopicByStatus } from '@/shared/api/Topics';
import { TopicMetadata } from '@/shared/types/data/topic';
import dynamic from 'next/dynamic';
import OnVoiceButton from '@/components/common/button/onVoiceButton';

const GameRelayBar = dynamic(
  () => import('@/components/common/bar/gameRelayBar'),
  { ssr: false },
);

const DynamicAuthDropdown = dynamic(
  () => import('@/components/common/dropdown/authDropdown'),
  { ssr: false },
);

const cn = classNames.bind(styles);

const Header = async () => {
  const res = await getTopicByStatus('onGoing');
  const data: TopicMetadata = res[0];

  return (
    <header className={cn('header-container')}>
      <div className={cn('header-wrapper')}>
        <div className={cn('header-inner')}>
          <HeaderLogo />
          <div className={cn('bar-wrapper')}>
            <Suspense>{data && <GameRelayBar endDate={data.endAt} />}</Suspense>
          </div>
        </div>
        <div className={cn('header-inner')}>
          <Suspense>{data && <DynamicAuthDropdown id={data._id} />}</Suspense>
          <OnVoiceButton />
          <div className={cn('button-container')}>
            <Suspense>{data && <DashBoardButton id={data._id} />}</Suspense>
            <PlayGameButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
