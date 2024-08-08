import React from 'react'
import styles from '@/app/p/[id]/page.module.scss'
import classNames from 'classnames/bind'
import PlayClientPage from '@/app/p/[id]/client'

const cn = classNames.bind(styles)

type Props = {
  params: {
    id: string;
  }
}

const PlayPage = ({ params }: Props) => {
  const { id } = params;
  return (
    <main className={cn('container')}>
      <PlayClientPage
        id={id}
      />
    </main>
  )
}

export default PlayPage
