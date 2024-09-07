import React, { useMemo } from 'react';
import styles from '@/components/container/my-ranking-table-container/MyRankingTableContainer.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';

const cn = classNames.bind(styles);

const MyRankingTableContainer = () => {
    return (
        <div className={cn('container')}>
            <div className={cn('table-header')}>
                <div className={cn('header-wrapper')}>
                    <div className={cn('header-inner-left')}>
                        <div className={cn('h-my-ranking')}>
                            <BaseText
                                size="medium"
                                color="BASE_BLUE_1"
                                weight="regular"
                                text="My Ranking"/>
                        </div>
                        <div className={cn('h-wallet-address')}>
                            <BaseText
                                size="medium"
                                color="BASE_BLUE_1"
                                weight="regular"
                                text="Wallet Address"/>
                        </div>
                    </div>
                    <div className={cn('header-inner-right')}>
                        <BaseText
                            size="medium"
                            color="BASE_BLUE_1"
                            weight="regular"
                            text="Onigiri"/>
                    </div>
                </div>
            </div>
            <div className={cn('table-body')}>
                <div className={cn('list-item')}>
                    <div className={cn('item-inner-left')}>
                        <div className={cn('i-my-ranking')}>
                            <BaseText
                                    size="medium"
                                    color="DARK"
                                    weight="regular"
                                    text="1"/>
                        </div>
                        <div className={cn('i-wallet-address')}>
                            <BaseText
                                size="medium"
                                color="DARK"
                                weight="regular"
                                text="0x67812...6fC6"/>
                        </div>
                    </div>
                    <div className={cn('item-inner-right')}>
                        <BaseText
                            size="medium"
                            color="DARK"
                            weight="regular"
                            text="1.77b"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyRankingTableContainer;