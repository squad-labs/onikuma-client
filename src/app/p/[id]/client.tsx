import React from 'react';
import styles from '@/app/p/[id]/client.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  id: string;
};

const PlayClientPage = ({ id }: Props) => {
  return (
    <div>
      <span>{id}</span>
    </div>
  );
};

export default PlayClientPage;
