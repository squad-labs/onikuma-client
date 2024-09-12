import React from 'react';
import styles from '@/app/p/[id]/page.module.scss';
import classNames from 'classnames/bind';
import PlayClientPage from '@/app/p/[id]/client';
import { getMetadata } from '@/shared/utils/metadata';
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

export const generateMetadata = async () => {
  return getMetadata({});
};

const PlayPage = async ({ params }: Props) => {
  const { id } = params;
  const cookie = cookies().get('accessToken');
  const round = generateRound();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      },
    );

    const data: Topic = await res.json();
    return (
      <main className={cn('container')}>
        <RoundProvider topic={data} round={round}>
          <PlayClientPage id={id} topic={data} />
        </RoundProvider>
      </main>
    );
  } catch (err) {
    return err;
  }
};

export default PlayPage;
