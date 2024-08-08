import React from 'react'
import styles from '@/app/h/[id]/page.module.scss'
import classNames from 'classnames/bind'
import HonorClientPage from '@/app/h/[id]/client'

const cn = classNames.bind(styles)

type Props = {
  params: {
    id: string;
  }
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
