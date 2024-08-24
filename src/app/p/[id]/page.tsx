import React from 'react';
import styles from '@/app/p/[id]/page.module.scss';
import classNames from 'classnames/bind';
import PlayClientPage from '@/app/p/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
import type { ResolvingMetadata } from 'next';
import { RoundProvider } from '@/context/partial/roundContext/RoundProvider';
import { cookies } from 'next/headers';
import { Topic } from '@/shared/types/data/topic';
import { generateRound } from '@/shared/utils/random';

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

const PlayPage = async ({ params }: Props) => {
  const { id } = params;
  const cookie = cookies().get('token');
  const round = generateRound();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/on-going`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIxOGQ0ZWY3NDBhYWY2ODZlZDcxZDAiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjI5MjAyODMsImV4cCI6MTcyNTUxMjI4M30.sdsioOpOm_qZi8LXt8j1V3N5Uv-U24EEPuIkMh6ufmM`,
        },
      },
    );

    const data: Topic = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <RoundProvider topic={data} round={round}>
            <PlayClientPage id={id} topic={data} />
          </RoundProvider>
        </div>
      </main>
    );
  } catch (err) {
    console.log(err);
    return <div>error</div>;
  }
};

export default PlayPage;
