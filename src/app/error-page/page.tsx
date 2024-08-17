import React from 'react';
import styles from '@/app/error-page/page.module.scss';
import classNames from 'classnames/bind';
import ErrorPage from '@/app/error-page/client';
import type { ResolvingMetadata } from 'next';
import { getMetadata } from '@/shared/utils/metadata';

const cn = classNames.bind(styles);

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

const ErrorAlertPage = () => {
  return (
    <main className={cn('container')}>
      <ErrorPage />
    </main>
  );
};

export default ErrorAlertPage;
