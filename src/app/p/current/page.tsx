import styles from '@/app/p/current/page.module.scss';
import { Topic } from '@/shared/types/data/topic';
import { getMetadata } from '@/shared/utils/metadata';
import { generateRound } from '@/shared/utils/random';
import React from 'react';
import classNames from 'classnames/bind';
import { RoundProvider } from '@/context/partial/roundContext/RoundProvider';
import PlayClientPage from '@/app/p/[id]/client';
import { cookies } from 'next/headers';

export const generateMetadata = async () => {
  return getMetadata({});
};

const cn = classNames.bind(styles);

const GameCurrentPage = async () => {
  const round = generateRound();
  const cookie = cookies().get('accessToken');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/on-going`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
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
    return err;
  }
};

export default GameCurrentPage;
