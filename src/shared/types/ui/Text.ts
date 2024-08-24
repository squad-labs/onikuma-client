import { ColorType } from '@/shared/types/ui/Color';
import { BaseExtraSize, BaseFontWeight } from '@/shared/types/ui//Base';
import { ReactNode } from 'react';

export type BaseTextProps = {
  text: string;
  color: ColorType;
  size: BaseExtraSize;
  weight: BaseFontWeight;
  classNames?: string[];
  icon?: ReactNode;
};

export type DateTextProps = {
  startDate: string;
  endDate?: string;
  isUTC?: boolean;
  withIcon?: boolean;
  color: ColorType;
  size: BaseExtraSize;
  weight: BaseFontWeight;
  classNames?: string[];
};
