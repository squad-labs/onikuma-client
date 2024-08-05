import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonShapeType =
  | 'shape-1'
  | 'shape-2'
  | 'shape-3'
  | 'shape-4'
  | 'shape-5'
  | 'shape-6';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  disabled?: boolean;
  shape: ButtonShapeType;
  onClick: () => void;
  fontSize?: 'small' | 'medium' | 'large';
  fontWeight?: 'light' | 'regular' | 'bold';
  loading?: boolean;
  children?: ReactNode;
  classNames?: string[];
};

export type PaddingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  disabled?: boolean;
  height: 'small' | 'medium' | 'large';
  fontSize?: 'small' | 'medium' | 'large';
  fontWeight?: 'light' | 'regular' | 'bold';
  children?: ReactNode;
  classNames?: string[];
};

export type ClickButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  name: string;
  disabled?: boolean;
  shape: 'square' | 'round';
  children?: ReactNode;
  classNames?: string[];
}
