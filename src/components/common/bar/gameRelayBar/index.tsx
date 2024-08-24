'use client';
import React, { Fragment } from 'react';
import styles from '@/components/common/bar/gameRelayBar/GameRelayBar.module.scss';
import classNames from 'classnames/bind';
import ContainerBar from '@/widgets/bar/containerBar';
import useTimer from '@/shared/hooks/useTimer';

const cn = classNames.bind(styles);

type Props = {
  endDate: string;
};

const GameRelayBar = ({ endDate }: Props) => {
  const { date, hour, minute, second } = useTimer(endDate);

  return (
    <ContainerBar
      label="game-relay-bar"
      size="large"
      classNames={['background-red']}
    >
      <Fragment>
        <span className={cn('text')}>{'Game end countdown: '}</span>
        <span
          className={cn('text-bold')}
        >{`${date}d ${hour}h ${minute}m ${second}s`}</span>
      </Fragment>
    </ContainerBar>
  );
};

export default GameRelayBar;
