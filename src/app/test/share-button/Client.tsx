'use client';
import React from 'react';
import styles from '@/app/test/share-button/page.module.scss';
import className from 'classnames/bind';
import ShareSocialsButton from '@/components/common/button/shareSocialsButton';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Share Button</h2>
      <section className={cn('element-container')}>
        <ShareSocialsButton
          buttonDirection = "left"/>
        <ShareSocialsButton
          buttonDirection = "down"/>
      </section>
    </div>
  );
};

export default TestClientPage;
