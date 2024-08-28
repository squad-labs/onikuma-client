'use client';
import { getPollResultImage } from '@/shared/api/Image';
import { PollResult } from '@/shared/types/data/dashboard';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

type Props = {
  source: PollResult;
};

const ResultClientPage = ({ source }: Props) => {
  const { data } = useQuery({
    queryKey: ['3124234'],
    queryFn: () => getPollResultImage(source),
  });

  return (
    <div>
      Hello, World
      {data && (
        <Image
          src={data}
          alt="poll result"
          width={1000}
          height={800}
          priority={true}
        />
      )}
    </div>
  );
};

export default ResultClientPage;
