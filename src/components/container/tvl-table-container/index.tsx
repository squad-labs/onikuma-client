import React, { useEffect, useState } from 'react';
import styles from '@/components/container/tvl-table-container/TvlTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import TableHeader from '@/components/common/etc/tableHeader';
import { Dashboard } from '@/shared/types/data/dashboard';
import Image from 'next/image';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

type Props = {
  dashboard: Dashboard;
};

const TvlTableContaienr = ({ dashboard }: Props) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cn('container')}>
      <div className={cn('top-inner')}>
        <BaseText
          text="Top TVL / Winning rate"
          color={'DARK'}
          size={'large'}
          weight="regular"
        />
      </div>
      <div className={cn('table-header')}>
        <TableHeader onlyName={false} />
        {width > 768 && <TableHeader onlyName={false} />}
      </div>
      <div className={cn('table-body')}>
        {dashboard.totalData.map((item, index) => {
          const isLastRow =
            index === dashboard.totalData.length - 1 ||
            (width > 768 && index === dashboard.totalData.length - 2);

          return (
            <div
              key={index}
              className={cn('item-wrapper')}
              style={{
                borderBottom: isLastRow
                  ? 'none'
                  : `1px solid ${COLOR['BASE_GRAY_2']}`,
              }}
            >
              <div className={cn('image-wrapper')}>
                <Image
                  src={item.imgUrl}
                  alt="image"
                  fill={true}
                  priority={true}
                />
              </div>
              <BaseText
                text={item.name}
                color="DARK"
                size="medium"
                weight="bold"
                classNames={['text-start']}
              />
              <BaseText
                text={`${item.winningRate}%`}
                color="DARK"
                size="medium"
                weight="bold"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TvlTableContaienr;
