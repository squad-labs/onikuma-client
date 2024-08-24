import { ColorType } from '@/shared/types/ui/Color';

export type BaseDividerProps = {
  type: 'vertical' | 'horizontal';
  color: ColorType;
  length?: number;
  minLength?: number;
  thick?: number;
  radius?: number;
};
