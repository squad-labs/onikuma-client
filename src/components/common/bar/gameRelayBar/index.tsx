import React, { Fragment } from 'react';
import styles from '@/components/common/bar/gameRelayBar/GameRelayBar.module.scss';
import classNames from 'classnames/bind';
import ContainerBar from '@/widgets/bar/containerBar';

const cn = classNames.bind(styles);

const GameRelayBar = () => {
  return (
    <ContainerBar
      label="game-relay-bar"
      size="large"
      classNames={['background-red']}
    >
      <Fragment>
        <span className={cn('text')}>{'Game end countdown: '}</span>
        <span className={cn('text-bold')}>{'4d 23h 34m 32s'}</span>
      </Fragment>
    </ContainerBar>
  );
};

export default GameRelayBar;
