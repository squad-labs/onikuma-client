import { InputHTMLAttributes, ReactNode } from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  shape?: 'default' | 'pill';
  state?: 'default' | 'error' | 'success';
  classNames?: string[];
  children?: ReactNode;
  icon?: ReactNode;
};

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
