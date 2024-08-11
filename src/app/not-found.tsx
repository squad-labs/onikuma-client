import { getMetadata } from '@/shared/utils/metadata';
import { ResolvingMetadata } from 'next';
import React from 'react'

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

const NotFound = () => {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found</p>
    </main>
  )
}

export default NotFound
