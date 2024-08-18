import React from 'react'
import styles from '@/app/p/[id]/client.module.scss'
import classNames from 'classnames/bind'
import DateText from '@/widgets/text/dateText'
import BaseDivider from '@/widgets/divider/baseDivider'
import { COLOR } from '@/shared/constants/COLOR'

const cn = classNames.bind(styles);

type Props = {
  id: string;
};

const PlayClientPage = ({ id }: Props) => {
  
  return (
    <div>
      <BaseDivider
        type='vertical'
        color={COLOR.DARK_GRAY_2}
        length={100}
        minLength={20}
        thick={2}
        radius={2}
      />
      <DateText startDate='2024-08-20' />
    </div>
  );
};

export default PlayClientPage;
