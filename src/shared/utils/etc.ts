import { ICON_SRC_PATH, IMAGE_SRC_PATH } from '@/shared/constants/PATH';

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getStaticSrc = (type: 'image' | 'icon', path: string) => {
  return `${type === 'image' ? IMAGE_SRC_PATH.BASE_DIR : ICON_SRC_PATH.BASE_DIR}${path}`;
};
