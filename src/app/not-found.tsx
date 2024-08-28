import { getMetadata } from '@/shared/utils/metadata';
import styles from '@/app/not-found.module.scss'
import classNames from 'classnames/bind';
import { ResolvingMetadata } from 'next';
import React from 'react';
import GoHomeButton from '@/widgets/button/paddingButton';
import ErrorSvg from '@/assets/images/error-image.svg';

type MetadataProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const cn = classNames.bind(styles);

export const generateMetadata = async (
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
) => {
  return getMetadata({});
};

const NotFound = () => {
  return (
    <main>
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
        <ErrorSvg
          className={cn('image')}
        />
      </div>
    </div>
    </main>
  );
};

export default NotFound;
