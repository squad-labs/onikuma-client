import React from 'react'
import styles from '@/app/d/[id]/client.module.scss'
import classNames from 'classnames/bind'
import DashboardClientPage from '@/app/d/[id]/client'

const cn = classNames.bind(styles)

const DashboardPage = () => {
  return (
    <main className={cn('container')}>
      <DashboardClientPage />
    </main>
  )
}

export default DashboardPage
