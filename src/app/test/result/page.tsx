import React from 'react';
import ResultClientPage from './client';
import { TestToken } from '@/shared/constants/TEST';

const ResultPage = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/my-data/detail/66bb07efff419cee8c3888e1`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    const data = await res.json();

    return (
      <div>
        <ResultClientPage source={data} />
      </div>
    );
  } catch (error) {}
};

export default ResultPage;
