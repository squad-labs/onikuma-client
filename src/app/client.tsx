'use client';
import React from 'react';
import styles from '@/app/client.module.scss';
import classNames from 'classnames/bind';
import RuleCard from '@/widgets/card/ruleCard';
import WalletConnectButton from '@/components/common/button/walletConnectButton';
import CardImage from '@/assets/images/card-image.svg';

const cn = classNames.bind(styles);

const MyClientPage = () => {
  return (
    <div className={cn('page-container')}>
      <h1 className={cn('main-header')}>Welcome to Onikuma</h1>
      <p className={cn('sub-header')}>Seal Onikuma and save the village!</p>
      <div className={cn('card-container')}>
        <RuleCard
          textLine1="Step 1"
          textLine2="Pool in"
          textLine3="Pool on who gets the largest pool to join the battle"
        >
          <CardImage viewBox="0 0 160 152" />
        </RuleCard>

        <RuleCard
          textLine1="Step 2"
          textLine2="Vote Early"
          textLine3="Vote early for cheaper stakes, or later with more data but higher stakes."
        >
          <CardImage viewBox="0 0 160 152" />
        </RuleCard>
        <RuleCard
          textLine1="Step 3"
          textLine2="Strategize"
          textLine3="Cut through the noise and get the average opinion among the players on who will get the largest TVL."
        >
          <CardImage viewBox="0 0 160 152" />
        </RuleCard>
        <RuleCard
          textLine1="Step 4"
          textLine2="Win and Launch Token"
          textLine3="Get the results daily. Get it right to seal Onikuma and earn your wins. If the winner pool surpasses 5k, the token will be launched!"
        >
          <CardImage viewBox="0 0 160 152" />
        </RuleCard>
      </div>
      <div className={cn('wallet-connect-button')}>
        <WalletConnectButton type={'home'} autoLogin={false} />
      </div>
    </div>
  );
};

export default MyClientPage;
