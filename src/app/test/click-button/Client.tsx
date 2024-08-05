'use client';
import React from 'react';
import styles from '@/app/test/click-button/page.module.scss';
import className from 'classnames/bind';
import ClickButton from '@/widgets/button/clickButton';

const cn = className.bind(styles);

const TestClientPage = () => {
    return (
      <div className={cn('container')}>
        <h2>Click Button</h2>
        <section className={cn('element-container')}>
          <ClickButton
            name="ClickButtonRound"
            shape="round"
          />
        </section>
        <section className={cn('element-container')}>
          <ClickButton
            name="ClickButtonSquare"
            shape="square"/>
        </section>
    </div>
    );
};

export default TestClientPage;