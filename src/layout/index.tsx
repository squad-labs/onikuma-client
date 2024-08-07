'use client';
import React, { Fragment, useMemo } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const headerShown = useMemo(() => {
    return true;
  }, []);

  return (
    <Fragment>
      {headerShown && <Header />}
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
