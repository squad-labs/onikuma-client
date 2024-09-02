import { getMetadata } from '@/shared/utils/metadata';
import styles from '@/app/not-found.module.scss';
import classNames from 'classnames/bind';
import { ResolvingMetadata } from 'next';
import React from 'react';
import ErrorSvg from '@/assets/images/error-image.svg';
import ErrorButton from '@/components/common/button/errorButton';

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
    <main className={cn('container')}>
      <div className={cn('inner')}>
        <div className={cn('text-container')}>
          <h1>
            Oops... <br /> Page not found
          </h1>
          <p>This page doesn&rsquo;t exist or was removed!</p>
          <p>We suggest you back to home.</p>
          <div className={cn('home-button-container')}>
            <ErrorButton />
          </div>
        </div>
        <div className={cn('image-container')}>
          <ErrorSvg className={cn('image')} />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
