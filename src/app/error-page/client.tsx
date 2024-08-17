'use client';
import React from 'react';
import styles from '@/app/error-page/client.module.scss';
import classNames from 'classnames/bind';
import { divide } from 'lodash-es';
import GoHomeButton from '@/widgets/button/paddingButton';

const cn = classNames.bind(styles);

const ErrorPage = () => {
  return (
    <div className={cn('page-container')}>
      <div className={cn('text-container')}>
        <h1>
          Oops... <br /> Page not found
        </h1>
        <p>This page doesn't exist or was removed!</p>
        <p>We suggest you back to home.</p>
        <div className={cn('home-button-container')}>
          <GoHomeButton
            name="Go Back Home"
            text="Go Back Home"
            label="BackHome Button"
            height="medium"
            fontSize="large"
            fontWeight="regular"
            onClick={() => console.log('Button Clicked')}
            classNames={['button-blue']}
          />
        </div>
      </div>
      <div className={cn('image-container')}>
        <img
          src="/images/error-image.svg"
          alt="Error Image"
          className={cn('image')}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
