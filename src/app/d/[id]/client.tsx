'use client'
import React from 'react'
import styles from '@/app/d/[id]/client.module.scss'
import classNames from 'classnames/bind'
import { getMetadata } from '@/shared/utils/metadata'
import { ResolvingMetadata } from 'next'

const cn = classNames.bind(styles)

type Props = {
  id: string;
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

const DashboardClientPage = ({ id }: Props) => {
  return (
    <div>
      <span>{id}</span>
    </div>
  )
}

export default DashboardClientPage
