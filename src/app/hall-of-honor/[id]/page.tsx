import React from 'react';
import styles from '@/app/hall-of-honor/[id]/page.module.scss';
import classNames from 'classnames/bind';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';
import { TestToken } from '@/shared/constants/TEST';
import { HonorType } from '@/shared/types/data/honor';
import HallOfHonorClientPage from '@/app/hall-of-honor/[id]/client';

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

const HallOfHonorPage = async ({ params }: Props) => {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/hall-of-honor/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const data: HonorType = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <HallOfHonorClientPage id={id} honor={data} />
        </div>
      </main>
    );
  } catch (err) {
    console.log(err);
    return <div>error</div>;
  }
};

export default HallOfHonorPage;
