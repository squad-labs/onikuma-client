import React from 'react'
import styles from '@/app/h/[id]/page.module.scss'
import classNames from 'classnames/bind'
import HonorClientPage from '@/app/h/[id]/client'
import { getMetadata } from '@/shared/utils/metadata'
import { ResolvingMetadata } from 'next'

const cn = classNames.bind(styles)

type Props = {
  params: {
    id: string;
  }
}

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

const HonorPage = ({ params }: Props) => {
  const { id } = params;

  return (
    <main className={cn('container')}>
      <HonorClientPage
        id={id}
      />
    </main>
  )
}

export default HonorPage
