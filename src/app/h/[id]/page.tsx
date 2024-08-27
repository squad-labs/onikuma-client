import React from 'react';
import styles from '@/app/h/[id]/page.module.scss';
import classNames from 'classnames/bind';
import HonorClientPage from '@/app/h/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';
import { Topic } from '@/shared/types/data/topic';

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/on-going`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MjAyODMsImV4cCI6MTcyNTUxMjI4M30.sdsioOpOm_qZi8LXt8j1V3N5Uv-U24EEPuIkMh6ufmM`,
        },
      },
    );

    const data: Topic = await res.json();
    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <HonorClientPage id={id} topic={data} />
        </div>
      </main>
    );
  } catch (err) {
    console.log(err);
    return <div>error</div>;
  }
};

export default HonorPage;
