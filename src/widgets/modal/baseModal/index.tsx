'use client';
import { ColorType } from '@/shared/types/ui/Color';
import styles from '@/widgets/modal/baseModal/BaseModal.module.scss';
import classNames from 'classnames/bind';
import React, { ReactNode, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const cn = classNames.bind(styles);

type Props = {
  background: ColorType;
  children: ReactNode;
};

const BaseModal = ({ background, children }: Props) => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  if (typeof window === 'undefined' || !isMount) return null;

  return ReactDOM.createPortal(
    <section className={cn('container', `${background}-background`)}>
      {children}
    </section>,
    document.getElementById('modal-root') as HTMLDivElement,
  );
};

export default BaseModal;
