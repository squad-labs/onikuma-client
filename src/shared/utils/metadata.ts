import { BaseMetadataType } from '@/shared/types/data/metadata';
import { BASE_METADATA } from '@/shared/constants/METADATA';
import { Metadata } from 'next';

export const getMetadata = ({
  title,
  siteName,
  description,
  image,
  asPath,
}: BaseMetadataType) => {
  const _title = title ? `Onikuma | ${title}` : BASE_METADATA.title;
  const _siteName = siteName ? siteName : BASE_METADATA.siteName;
  const _description = description ? description : BASE_METADATA.description;
  const _image = image ? image : BASE_METADATA.image;
  const _asPath = asPath ? asPath : '';

  const metadata: Metadata = {
    metadataBase: new URL(BASE_METADATA.url),
    applicationName: title,
    alternates: {
      canonical: _asPath,
    },
    title: _title,
    description: _description,
    keywords: [...BASE_METADATA.keywords],
    openGraph: {
      title: _title,
      description: _description,
      siteName: _siteName,
      locale: 'en_US',
      type: 'website',
      url: _asPath,
      images: {
        url: _image,
      },
    },
    twitter: {
      title: _title,
      description: _description,
      images: {
        url: _image,
      },
    },
  };

  return metadata;
};
