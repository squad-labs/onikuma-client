import React from 'react'
import styles from '@/app/my-page/page.module.scss'
import classNames from 'classnames/bind'
import MyClientPage from '@/app/my-page/client'
import type { ResolvingMetadata } from 'next'
import { getMetadata } from '@/shared/utils/metadata'

const cn = classNames.bind(styles)

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

const MyPage = () => {
  return (
    <main className={cn('container')}>
      <MyClientPage />
    </main>
  )
}

export default MyPage
