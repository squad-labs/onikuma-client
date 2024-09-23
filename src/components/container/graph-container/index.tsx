'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@/components/container/graph-container/GraphContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import GraphBlock from '@/widgets/block/graphBlock';
import { numberSuffix, thousandFormat } from '@/shared/utils/number';
import { Dashboard, DashboardDataType } from '@/shared/types/data/dashboard';
import { ColorType } from '@/shared/types/ui/Color';
import Image from 'next/image';

const cn = classNames.bind(styles);

type Props = {
  type: 'tvl' | 'vote';
  dashboard: Dashboard;
};

type GraphColorMapType = {
  [key: number]: ColorType;
};

export const GraphColorMap: GraphColorMapType = {
  1: 'BASE_GREEN_1',
  2: 'DARK_RED_2',
  3: 'DARK_RED_2',
  4: 'DARK_RED_2',
  5: 'DARK_RED_2',
  6: 'DARK_RED_2',
  7: 'DARK_RED_2',
  8: 'DARK_RED_2',
};

const GraphContainer = ({ type, dashboard }: Props) => {
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

  const largestVote = useMemo(() => {
    return dashboard.totalData.reduce((prev, current) => {
      return prev.vote > current.vote ? prev : current;
    });
  }, [dashboard]);

  const largestTvl = useMemo(() => {
    return dashboard.totalVolume[0];
  }, [dashboard]);

  const title = useMemo(() => {
    return type === 'tvl' ? 'Total Value Locked' : 'Total Votes';
  }, [type]);

  const description = useMemo(() => {
    return type === 'tvl' ? '$HONEY' : 'number of votes';
  }, [type]);

  const renderTvlGraph = useCallback(() => {
    return dashboard.totalVolume.map((item: number, index: number) => {
      const rankText = index + 1;
      const chunk = largestTvl / 100;
      const ratio = Math.floor(item / chunk);
      return (
        <div className={cn('list-item')} key={index}>
          <BaseText
            text={`${rankText}${numberSuffix(rankText)}`}
            size={'medium'}
            weight={'light'}
            color={'DARK'}
          />
          <div className={cn('option-title')} />
          <div className={cn('block-wrapper')}>
            <GraphBlock fillColor={GraphColorMap[rankText]} fillRatio={ratio} />
          </div>
          <div className={cn('text-wrapper')}>
            <BaseText
              text={`$${thousandFormat(item.toFixed(0))}`}
              size="medium"
              weight="light"
              color={'DARK_GRAY_1'}
            />
          </div>
        </div>
      );
    });
  }, [type, dashboard, width]);

  const renderVoteGraph = useCallback(() => {
    return dashboard.totalData.map((item: DashboardDataType, index: number) => {
      const rankText = index + 1;
      const chunk = largestVote.vote / 100;
      const ratio = Math.floor(item.vote / chunk);
      return (
        <div className={cn('list-item')} key={index}>
          <BaseText
            text={`${rankText}${numberSuffix(rankText)}`}
            size={'medium'}
            weight={'light'}
            color={'DARK'}
          />
          <div className={cn('option-text')}>
            <Image
              src={item.imgUrl}
              alt={item.name}
              width={240}
              height={240}
              className={cn('image')}
              priority={true}
            />
            {width > 768 && (
              <BaseText
                text={item.name}
                size={'medium'}
                weight={'light'}
                color={'DARK'}
              />
            )}
          </div>
          <div
            className={cn(width < 768 ? 'vote-block-wrapper' : 'block-wrapper')}
          >
            <GraphBlock fillColor={'BASE_BLUE_1'} fillRatio={ratio} />
          </div>
          <div className={cn('text-wrapper')}>
            <BaseText
              text={`${thousandFormat(item.vote.toFixed(0))}`}
              size="medium"
              weight="light"
              color={'DARK_GRAY_1'}
            />
          </div>
        </div>
      );
    });
  }, [type, dashboard, width]);

  return (
    <div className={cn('container')}>
      <div className={cn('top-container')}>
        <BaseText
          text={title}
          size={'large'}
          weight={'regular'}
          color={'DARK'}
        />
        <BaseText
          text={`(${description})`}
          size={'medium'}
          weight={'light'}
          color={'DARK_GRAY_5'}
        />
      </div>
      <div className={cn('list-container')}>
        {type === 'tvl' ? renderTvlGraph() : renderVoteGraph()}
      </div>
    </div>
  );
};

export default GraphContainer;
