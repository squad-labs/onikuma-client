import { InputHTMLAttributes, ReactNode } from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
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
  showButtons?: boolean;
  allowsNegative?: boolean;
};

export type OTPInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  disabled?: boolean;
  change: (index: number, value: string) => void;
  values: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  shape?: 'default' | 'pill';
  state?: 'default' | 'process';
  classNames?: string[];
  maxLength?: number;
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
