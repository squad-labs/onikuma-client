import React from 'react';
import styles from '@/app/p/[id]/page.module.scss';
import classNames from 'classnames/bind';
import PlayClientPage from '@/app/p/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import type { ResolvingMetadata } from 'next';

const cn = classNames.bind(styles);

type Props = {
  params: {
    id: string;
  };
};

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

const PlayPage = ({ params }: Props) => {
  const { id } = params;
  return (
    <main className={cn('container')}>
      <PlayClientPage id={id} />
    </main>
  );
};

export default PlayPage;
