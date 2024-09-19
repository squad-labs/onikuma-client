'use client';
import React from 'react';
import styles from '@/app/client.module.scss';
import classNames from 'classnames/bind';
import RuleCard from '@/widgets/card/ruleCard';
import WalletConnectButton from '@/components/common/button/walletConnectButton';
import Image from 'next/image';
import { IMAGE_SRC_PATH, LOGO_SRC_PATH } from '@/shared/constants/PATH';
import { getStaticSrc } from '@/shared/utils/etc';

const cn = classNames.bind(styles);

const MyClientPage = () => {
  return (
    <div className={cn('page-container')}>
      <h1 className={cn('main-header')}>
        Welcome to
        <span className={cn('title')}>
          <Image
            src={getStaticSrc('logo', LOGO_SRC_PATH.SRC.LOGO_TITLE)}
            alt="logo"
            width={207}
            height={39}
          />
        </span>
      </h1>
      <p className={cn('sub-header')}>Seal Onikuma and save the village!</p>
      <div className={cn('card-container')}>
        <RuleCard
          textLine1="Step 1"
          textLine2="Choose your winner"
          textLine3="Select candidates until the final, continue guessing who will win the largest TVL and pool in to fianlize your vote!"
        >
          <Image
            src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.RULE_1)}
            alt="rule-card"
            width={160}
            height={152}
            className={cn('card-image')}
            priority
            quality={100}
          />
        </RuleCard>

        <RuleCard
          textLine1="Step 2"
          textLine2="Strategize"
          textLine3="Cut through the noise and get the average opinion among the players on who will get the largest TVL."
        >
          <Image
            src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.RULE_2)}
            alt="rule-card"
            width={160}
            height={152}
            className={cn('card-image')}
            priority
            quality={100}
          />
        </RuleCard>
        <RuleCard
          textLine1="Step 3"
          textLine2="Win your opinion"
          textLine3="Get the results daily.  Get it right to seal Onikuma and earn your wins."
        >
          <Image
            src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.RULE_3)}
            alt="rule-card"
            width={160}
            height={152}
            className={cn('card-image')}
            priority
            quality={100}
          />
        </RuleCard>
        <RuleCard
          textLine1="Step 4"
          textLine2="Special perks"
          textLine3="Contribute the highest for a candidate to change the image. Also, contribute the highest to set the AI voice to conquer Onikuma!"
        >
          <Image
            src={getStaticSrc('image', IMAGE_SRC_PATH.SRC.RULE_4)}
            alt="rule-card"
            width={160}
            height={152}
            className={cn('card-image')}
            priority
            quality={100}
          />
        </RuleCard>
      </div>
      <div className={cn('wallet-connect-button')}>
        <WalletConnectButton type={'home'} autoLogin={true} />
      </div>
      <Image
        src={getStaticSrc('logo', LOGO_SRC_PATH.SRC.BASE_LOGO)}
        alt="logo"
        width={300}
        height={295}
        className={cn('image')}
      />
    </div>
  );
};

export default MyClientPage;
