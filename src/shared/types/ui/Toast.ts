import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'link';

export type BaseToastProps = {
  toastId: number;
  index: number;
  type?: ToastType;
  text?: {
    primaryText: string;
    secondaryText: string;
  };
  canClose: boolean;
  autoClose: {
    duration: number;
  } | null;
  children?: ReactNode;
};
