import { ReactNode } from 'react';

export type ToastProps = {
  type?: 'success' | 'error' | 'requireAction';
  message?: string;
  onClose?: () => void;
  children?: ReactNode;
  classNames?: string[];
};
