import React, { Fragment } from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
