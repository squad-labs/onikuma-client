import React from 'react';
import styles from '@/components/common/etc/tableHeader/TableHeader.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import Image from 'next/image';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { getStaticSrc } from '@/shared/utils/etc';

const cn = classNames.bind(styles);

type Props = {
  onlyName: boolean;
};

const TableHeader = ({ onlyName }: Props) => {
  return (
    <div className={cn('container')}>
      <div className={cn('name-wrapper')}>
        <BaseText size="medium" color="BASE_BLUE_1" weight="bold" text="Name" />
        <Image
          src={getStaticSrc('icon', ICON_SRC_PATH.SRC.DOWNLOAD)}
          alt="download"
          width={16}
          height={16}
          className={cn('icon')}
        />
      </div>
      {onlyName || (
        <BaseText
          size="medium"
          color="BASE_BLUE_1"
          weight="bold"
          text="Winning rate"
        />
      )}
    </div>
  );
};

export default TableHeader;
