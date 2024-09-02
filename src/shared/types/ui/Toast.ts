import { ReactNode } from 'react';

export type BaseToastProps = {
  type?: 'success' | 'error' | 'requireAction';
  message?: string;
  secondaryMessage?: string;
  closable?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  classNames?: string[];
};
