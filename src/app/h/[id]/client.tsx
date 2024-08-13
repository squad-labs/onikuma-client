'use client';
import React from 'react';
import styles from '@/app/h/[id]/client.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  id: string;
};

const HonorClientPage = ({ id }: Props) => {
  return (
    <div>
      <span>{id}</span>
    </div>
  );
};

export default HonorClientPage;
