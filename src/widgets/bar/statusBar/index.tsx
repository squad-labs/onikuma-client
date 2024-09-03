import React from 'react';
import styles from '@/widgets/bar/statusBar/StatusBar.module.scss';
import classNames from 'classnames/bind';
import { StatusBarProps } from '@/shared/types/ui/Bar';

const cn = classNames.bind(styles);

const BaseBar = ({ label, classNames = [] }: StatusBarProps) => {
  return (
    <div className={cn('bar-container', `bar-${label}`, ...classNames)}>
      <p>{label}</p>
    </div>
  );
};

export default BaseBar;
