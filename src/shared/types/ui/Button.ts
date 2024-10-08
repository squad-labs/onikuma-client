import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ColorType } from '@/shared/types/ui/Color';
import { LinkShare } from '@/shared/types/data/link';

export type ButtonTheme = 'fill' | 'outline';

export type ButtonColorObject = {
  primary: ColorType;
  secondary: ColorType;
};

export type ButtonShapeType =
  | 'shape-1'
  | 'shape-2'
  | 'shape-3'
  | 'shape-4'
  | 'shape-5'
  | 'shape-6'
  | 'shape-7'
  | 'shape-8';

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  label: string;
  theme: ButtonTheme;
  role?: 'button' | 'submit' | 'reset';
  colors: ButtonColorObject;
  disabled?: boolean;
  shape: ButtonShapeType;
  fontSize?: 'small' | 'medium' | 'large';
  fontWeight?: 'light' | 'regular' | 'bold';
  loading?: boolean;
  children?: ReactNode;
  classNames?: string[];
};

export type PaddingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  label: string;
  theme?: ButtonTheme;
  colors?: ButtonColorObject;
  role?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  height: 'small' | 'medium' | 'large';
  fontSize?: 'small' | 'medium' | 'large';
  fontWeight?: 'light' | 'regular' | 'bold';
  children?: ReactNode;
  classNames?: string[];
};

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  role?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  shape: 'round' | 'square' | 'rectangle';
  height?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  classNames?: string[];
};

export type ShareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  direction: 'left' | 'down';
  classNames?: string[];
  startIconImage: string;
  closeIconImage: string;
  contents: LinkShare[];
};
