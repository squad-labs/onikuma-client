'use client';
import React from 'react';
import styles from '@/app/test/base-toast/page.module.scss';
import className from 'classnames/bind';
import BaseToast from '@/widgets/toast/baseToast';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Base Toast</h2>
      <section className={cn('element-container')}>
        <BaseToast
          type='success'
        />
        <BaseToast
          type='requireAction'
        />
        <BaseToast
          type='error'
        />
      </section>
      <section className={cn('element-container')}>
        <BaseToast
          type='success'
          closable={true}
        />
        <BaseToast
          type='requireAction'
          closable={true}
        />
        <BaseToast
          type='error'
          closable={true}
        />
      </section>
    </div>
  );
};

export default TestClientPage;
