import React from 'react';
import styles from '@/components/common/etc/tableHeader/TableHeader.module.scss';
import classNames from 'classnames/bind';
import DownloadSvg from '@/assets/icons/download.svg';
import BaseText from '@/widgets/text/baseText';

const cn = classNames.bind(styles);

type Props = {
  onlyName: boolean;
};

const TableHeader = ({ onlyName }: Props) => {
  return (
    <div className={cn('container')}>
      <div className={cn('name-wrapper')}>
        <BaseText size="medium" color="BASE_BLUE_1" weight="bold" text="Name" />
        <DownloadSvg viewBox="0 0 16 16" className={cn('icon')} />
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
