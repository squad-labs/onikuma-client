import { getStaticSrc } from '@/shared/utils/etc';
import { IMAGE_SRC_PATH } from '@/shared/constants/PATH';

export const TOAST_SRC = {
  SUCCESS: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_SUCCESS),
    primaryText: 'Saved successfully',
    secondaryText: 'Your changes have been saved successfully',
  },
  ERROR: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ERROR),
    primaryText: 'Error occurred',
    secondaryText:
      'Connection error. Unable to connect to the server at present',
  },
  INFO: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ACTIONREQ),
    primaryText: 'Action required',
    secondaryText:
      'Incomplete fields. Please fill in all required information now',
  },
  LINK: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_SUCCESS),
    primaryText: 'Copied successfully',
    secondaryText: 'The link has been copied to your clipboard',
  },
} as const;
