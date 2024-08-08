import React from 'react'
import styles from '@/app/h/[id]/page.module.scss'
import classNames from 'classnames/bind'
import HonorClientPage from '@/app/h/[id]/client'

const cn = classNames.bind(styles)

const HonorPage = () => {
  return (
    <main className={cn('container')}>
      <HonorClientPage />
    </main>
  )
}

export default HonorPage
