import React from 'react';
import styles from '@/app/h/[id]/page.module.scss';
import classNames from 'classnames/bind';
import HonorClientPage from '@/app/h/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';
import { Topic } from '@/shared/types/data/topic';
import { HonorType } from '@/shared/types/data/honor';

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

const HonorPage = async ({ params }: Props) => {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/hall-of-honor/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MjAyODMsImV4cCI6MTcyNTUxMjI4M30.sdsioOpOm_qZi8LXt8j1V3N5Uv-U24EEPuIkMh6ufmM`,
        },
      },
    );

    const data: HonorType = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <HonorClientPage id={id} honor={data} />
        </div>
      </main>
    );
  } catch (err) {
    console.log(err);
    return <div>error</div>;
  }
};

export default HonorPage;
