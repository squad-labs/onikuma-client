import { InputHTMLAttributes, ReactNode } from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number ;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  shape?: 'default' | 'pill';
  state?: 'default' | 'error' | 'success';
  classNames?: string[];
  children?: ReactNode;
  icon?: ReactNode;
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
