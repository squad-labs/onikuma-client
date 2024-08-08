import BaseButton from '@/widgets/button/baseButton'
import React from 'react'

const PlayGameButton = () => {
  return (
    <BaseButton
      text={'Play Game'}
      theme={'fill'}
      colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
      label='play-game-button'
      role={'button'}
      shape={'shape-4'}
      fontSize={'large'}
      fontWeight={'regular'}
      loading={false}
      onClick={() => console.log('Play Game button clicked')}
      classNames={[]}
      disabled
    />
  )
}

export default PlayGameButton
