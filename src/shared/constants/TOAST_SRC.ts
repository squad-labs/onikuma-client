import { getStaticSrc } from '@/shared/utils/etc';
import { IMAGE_SRC_PATH } from '@/shared/constants/PATH';

export const TOAST_SRC = {
  SUCCESS: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_SUCCESS),
    presetMessage: 'Saved successfully',
    presetSecondaryMessage: 'Your changes have been saved successfully',
  },
  ERROR: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ERROR),
    presetMessage: 'Error occurred',
    presetSecondaryMessage:
      'Connection error. Unable to connect to the server at present',
  },
  REQUIRE_ACTION: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ACTIONREQ),
    presetMessage: 'Action required',
    presetSecondaryMessage:
      'Incomplete fields. Please fill in all required information now',
  },
} as const;
