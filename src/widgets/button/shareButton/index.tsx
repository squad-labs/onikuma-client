import React, { useCallback, useState } from 'react';
import styles from '@/widgets/button/shareButton/ShareButton.module.scss';
import classNames from 'classnames/bind';
import { ShareButtonProps } from '@/shared/types/ui/Button';
import Image from 'next/image';
import IconButton from '@/widgets/button/iconButton';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { LinkShare } from '@/shared/types/data/link';

const cn = classNames.bind(styles);

const ShareButton = ({
  direction,
  startIconImage,
  closeIconImage,
  contents = [],
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>();
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const renderIcon = useCallback(() => {
    return isOpen ? (
      <Image
        src={closeIconImage}
        alt="close"
        width={24}
        height={22}
        priority
        quality={100}
        className={cn(`close-${direction}-icon`)}
      />
    ) : (
      <Image
        src={startIconImage}
        alt="share"
        width={24}
        height={22}
        priority
        quality={100}
        className={cn(`share-${direction}-icon`)}
      />
    );
  }, [isOpen]);

  return (
    <div className={cn('button-wrapper', `button-wrapper-${direction}`)}>
      {contents.map((content: LinkShare, index: number) => {
        const handler = content.handler;
        return (
          <div
            key={index}
            className={cn(
              `button-list-${direction}-wrapper`,
              isOpen
                ? `button-list-${direction}-wrapper-${index + 1}`
                : isOpen !== undefined
                  ? `button-list-${direction}-wrapper-hide-${index + 1}`
                  : null,
            )}
          >
            <IconButton
              name={content.name}
              onClick={() => handler && handler()}
              shape="round"
              height="medium"
              classNames={['button-blue']}
            >
              <div className={cn('button-inner')}>
                <div className={cn('icon-wrapper')}>
                  <Image
                    src={getStaticSrc('icon', ICON_SRC_PATH.SRC[content.icon])}
                    alt={content.name}
                    width={24}
                    height={22}
                    priority
                    quality={100}
                    className={cn('icon')}
                  />
                </div>
              </div>
            </IconButton>
          </div>
        );
      })}
      <IconButton
        name="share-option-expand-button"
        onClick={toggleOpen}
        shape="round"
        height="medium"
        classNames={['button-blue']}
      >
        <div className={cn('button-inner')}>
          <div className={cn('icon-wrapper', { isOpen })}>{renderIcon()}</div>
        </div>
      </IconButton>
    </div>
  );
};

export default ShareButton;
