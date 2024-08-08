import React from 'react'
import styles from '@/layout/header/Header.module.scss';
import classNames from 'classnames/bind';
import HeaderLogo from '@/components/common/logo/headerLogo';
import GameRelayBar from '@/components/common/bar/gameRelayBar';
import DashBoardButton from '@/components/common/button/dashBoardButton';
import PlayGameButton from '@/components/common/button/playGameButton';

const cn = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cn('header-container')}>
      <div className={cn('header-wrapper')}>
        <div className={cn('header-inner')}>
          <HeaderLogo />
          <div className={cn('bar-wrapper')}>
            <GameRelayBar />
          </div>
        </div>
        <div className={cn('header-inner')}>
          <DashBoardButton />
          <PlayGameButton />
        </div>
      </div>
    </header>
  )
}

export default Header
