import React from 'react';
import HomeClient from '@/app/client';
import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';

type MetadataProps = {
  params: {
    id: string;
  }
  searchParams: { 
    [key: string]: string | string[] | undefined 
  }
}

export const generateMetadata = async ({ params, searchParams }: MetadataProps, parent: ResolvingMetadata) => {
  return getMetadata({})
}

const HomePage = () => {
  return (
    <main>
      <HomeClient />
    </main>
  );
};

export default HomePage;
