import BaseLogo from '@/widgets/logo/baseLogo'
import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
  return (
    <Link href="/">
      <BaseLogo size={'medium'} /> 
    </Link>
  )
}

export default HeaderLogo
