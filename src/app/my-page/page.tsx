import React from 'react'
import styles from '@/app/my-page/page.module.scss'
import classNames from 'classnames/bind'
import MyClientPage from '@/app/my-page/client'

const cn = classNames.bind(styles)

const MyPage = () => {
  return (
    <main className={cn('container')}>
      <MyClientPage />
    </main>
  )
}

export default MyPage
