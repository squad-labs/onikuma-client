'use client';
import React, { ReactNode, Fragment } from 'react';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return <Fragment>{children}</Fragment>;
};

export default AppProvider;
