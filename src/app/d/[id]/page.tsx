import React from 'react';
import styles from '@/app/d/[id]/page.module.scss';
import classNames from 'classnames/bind';
import DashboardClientPage from '@/app/d/[id]/client';

const cn = classNames.bind(styles);

type Props = {
  params: {
    id: string;
  };
};

const DashboardPage = ({ params }: Props) => {
  const { id } = params;

  return (
    <main className={cn('container')}>
      <div className={cn('inner')}>
        <DashboardClientPage id={id} />
      </div>
    </main>
  );
};

export default DashboardPage;
