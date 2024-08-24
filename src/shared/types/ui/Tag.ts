import {
  BaseFontWeight,
  BaseLengthSize,
  BaseRadius,
  BaseSize,
} from '@/shared/types/ui/Base';
import { ButtonColorObject } from '@/shared/types/ui/Button';
import { ReactNode } from 'react';

export type BaseTagProps = {
  title?: string;
  padding: BaseLengthSize;
  size?: BaseSize;
  weight?: BaseFontWeight;
  color: ButtonColorObject;
  role?: 'tag';
  label?: string;
  classNames?: string[];
  children?: ReactNode;
};
