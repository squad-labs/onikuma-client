import { TestToken } from '@/shared/constants/TEST';
import styles from '@/app/p/current/page.module.scss';
import { Topic } from '@/shared/types/data/topic';
import { getMetadata } from '@/shared/utils/metadata';
import { generateRound } from '@/shared/utils/random';
import { ResolvingMetadata } from 'next';
import React from 'react';
import classNames from 'classnames/bind';
import { RoundProvider } from '@/context/partial/roundContext/RoundProvider';
import PlayClientPage from '@/app/p/[id]/client';

type MetadataProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const generateMetadata = async (parent: ResolvingMetadata) => {
  return getMetadata({});
};

const cn = classNames.bind(styles);

const GameCurrentPage = async () => {
  const round = generateRound();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/on-going`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const data: Topic = await res.json();

    return (
      <main className={cn('container')}>
        <div className={cn('inner')}>
          <RoundProvider topic={data} round={round}>
            <PlayClientPage id={data._id} topic={data} />
          </RoundProvider>
        </div>
      </main>
    );
  } catch (err) {
    console.log('err', err);
    return <div>error</div>;
  }
};

export default GameCurrentPage;