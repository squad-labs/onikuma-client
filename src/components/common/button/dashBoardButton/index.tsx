import BaseButton from '@/widgets/button/baseButton';
import React from 'react';

const DashBoardButton = () => {
  return (
    <BaseButton
      text={'Dashboard'}
      theme={'outline'}
      colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
      label="dashboard-button"
      role={'button'}
      shape={'shape-4'}
      fontSize={'large'}
      fontWeight={'regular'}
      loading={false}
      onClick={() => console.log('Dashboard button clicked')}
      classNames={[]}
    />
  );
};

export default DashBoardButton;
