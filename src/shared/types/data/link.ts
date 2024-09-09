import { ICON_SRC_PATH } from '@/shared/constants/PATH';

export type LinkShare = {
  name: string;
  icon: keyof typeof ICON_SRC_PATH.SRC;
  type: 'link' | 'image' | 'function';
  link?: string;
  image?: string;
  handler?: (value?: string) => void;
};
