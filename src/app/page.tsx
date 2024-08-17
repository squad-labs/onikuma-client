import React from 'react';
import HomeClient from '@/app/client';
import styles from '@/app/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';

type MetadataProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const generateMetadata = async (
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
) => {
  return getMetadata({});
};
export const generateMetadata = async (
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
) => {
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
