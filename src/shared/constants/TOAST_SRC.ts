import { getStaticSrc } from '@/shared/utils/etc';
import { IMAGE_SRC_PATH } from '@/shared/constants/PATH';

export const TOAST_SRC = {
  SUCCESS: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_SUCCESS),
  },
  ERROR: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ERROR),
  },
  INFO: {
    imageSrc: getStaticSrc('image', IMAGE_SRC_PATH.SRC.TOAST_ACTIONREQ),
  },
} as const;

export const TOAST_RESPONSE = {
  COPY_LINK: {
    SUCCESS: {
      primaryText: 'Link Copied successfully',
      secondaryText: 'The link has been copied to your clipboard',
    },
    ERROR: {
      primaryText: 'Copy failed',
      secondaryText: 'An error occurred while copying the link',
    },
  },
  COPY_IMAGE: {
    SUCCESS: {
      primaryText: 'Image Copied successfully',
      secondaryText: 'The image has been copied to your clipboard',
    },
    ERROR: {
      primaryText: 'Copy failed',
      secondaryText: 'An error occurred while copying the image',
    },
  },
  SEND_TRANSACTION: {
    SUCCESS: {
      primaryText: 'Transaction successful',
      secondaryText: 'Your transaction has been successfully processed',
    },
    ERROR: {
      primaryText: 'Transaction failed',
      secondaryText: 'An error occurred while processing your transaction',
    },
  },
  UPLOAD_IMAGE: {
    SUCCESS: {
      primaryText: 'Image uploaded successfully',
      secondaryText: 'The image has been successfully uploaded',
    },
    ERROR: {
      primaryText: 'Upload failed',
      secondaryText: 'An error occurred while uploading the image',
    },
  },
} as const;
