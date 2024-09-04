'use client';
import React, { useMemo, useRef, useState } from 'react';
import styles from '@/components/common/dropdown/authDropdown/AuthDropdown.module.scss';
import classNames from 'classnames/bind';
import { useAccount } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import BaseText from '@/widgets/text/baseText';
import { getShortenAddress } from '@/shared/utils/format';
import { useAuth } from '@/shared/hooks/useAuth';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const AuthDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useAccount();
  const { logout } = useAuth({ autoLogin: false });
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useOnClickOutside({
    ref: dropdownRef,
    handler: () => setOpen(false),
    mouseEvent: 'click',
  });

  const isMyPage = useMemo(() => {
    return pathname === '/my-page';
  }, [pathname]);

  if (!address) return null;

  return (
    <div className={cn('dropdown-container')}>
      <button
        ref={dropdownRef}
        className={cn('dropdown-header')}
        onClick={() => setOpen(!open)}
      >
        <BaseText
          text={getShortenAddress(address)}
          size={'medium'}
          weight={'regular'}
          color={'DARK'}
        />
        <Image
          src={getStaticSrc('icon', ICON_SRC_PATH.SRC.DROPDOWN)}
          alt="dropdown"
          width={24}
          height={24}
          className={cn('dropdown-icon')}
        />
      </button>
      {open && (
        <div className={cn('dropdown-list')}>
          <button
            onClick={() => router.push('/my-page')}
            className={cn('list-item', {
              able: isMyPage,
              disable: !isMyPage,
            })}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.PROFILE)}
              alt="profile"
              width={24}
              height={24}
              className={cn('icon')}
            />
            <BaseText
              text={'View my data'}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
          <button
            onClick={() => {
              logout();
              router.refresh();
            }}
            className={cn('list-item', { disable: true })}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.DISCONNECT)}
              alt="disconnect"
              width={24}
              height={24}
              className={cn('icon')}
            />
            <BaseText
              text={'Disconnect'}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
