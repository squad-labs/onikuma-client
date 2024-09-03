import React from 'react';
import HomeClient from '@/app/client';
import styles from '@/app/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';

const cn = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const HomePage = () => {
  return (
    <main className={cn('container')}>
      <div className={cn('inner')}>
        <HomeClient />
      </div>
    </main>
  );
};

export default HomePage;
