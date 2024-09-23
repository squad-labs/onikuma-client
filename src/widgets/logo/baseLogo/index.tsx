import React from 'react';
import styles from '@/widgets/logo/baseLogo/BaseLogo.module.scss';
import classNames from 'classnames/bind';
import TextLogo from '@/public/logo/text-logo.svg';
import { BaseLogoProps } from '@/shared/types/ui/Logo';

const cn = classNames.bind(styles);

const BaseLogo = ({ size }: BaseLogoProps) => {
  return (
    <TextLogo viewBox="0 0 128 40" className={cn('logo', `logo-${size}`)} />
  );
};

export default BaseLogo;
