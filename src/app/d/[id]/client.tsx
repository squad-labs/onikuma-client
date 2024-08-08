'use client'
import React from 'react'
import styles from '@/app/d/[id]/page.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

type Props = {
  id: string;
}

const DashboardClientPage = ({ id }: Props) => {
  return (
    <div>
      <span>{id}</span>
    </div>
  )
}

export default DashboardClientPage
