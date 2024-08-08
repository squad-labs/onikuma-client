import React from 'react'
import styles from '@/app/p/[id]/page.module.scss'
import classNames from 'classnames/bind'
import PlayClientPage from '@/app/p/[id]/client'

const cn = classNames.bind(styles)

const PlayPage = () => {
  return (
    <main className={cn('container')}>
      <PlayClientPage />
    </main>
  )
}

export default PlayPage
