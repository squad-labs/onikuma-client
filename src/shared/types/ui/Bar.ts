import { BaseFontWeight, BaseSize } from '@/shared/types/ui/Base';
import { AriaRole, ReactNode } from 'react';

export type BaseBarProps = {
  label: string;
  role?: AriaRole;
  text: string;
  size: BaseSize;
  fontSize?: BaseSize;
  fontWeight?: BaseFontWeight;
  loading?: boolean;
  children?: ReactNode;
  classNames?: string[];
};

export type ContainerBarProps = {
  label: string;
  role?: AriaRole;
  children: ReactNode;
  size: BaseSize;
  loading?: boolean;
  classNames?: string[];
};

export type StatusBarProps = {
  label: string;
  children?: ReactNode; 
  classNames?: string[];
}