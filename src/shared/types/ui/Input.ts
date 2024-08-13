import { InputHTMLAttributes, ReactNode } from 'react';

export type NumberInputProps = {
  value: number | '';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: number | '') => void;
  allowsNegative?: boolean;
  allowsZero?: boolean;
  showIncDecButton?: boolean;
  shape?: 'default' | 'pill';
  state?: 'default' | 'error' | 'success';
  helperText?: string;
  children?: ReactNode;
  classNames?: string[];
  label: string;
  placeholder?: string;
};
