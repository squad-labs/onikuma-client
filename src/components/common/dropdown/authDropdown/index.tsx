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
import IconButton from '@/widgets/button/iconButton';
import ReactDOM from 'react-dom';

const cn = classNames.bind(styles);

type Props = {
  id: string;
};

const AuthDropdown = ({ id }: Props) => {
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

  const isLeaderboard = useMemo(() => {
    return pathname === '/leader-board';
  }, [pathname]);

  const isDashbaord = useMemo(() => {
    return pathname.includes('/d/');
  }, [pathname]);

  const isGame = useMemo(() => {
    return pathname.includes('/p/');
  }, [pathname]);

  if (!address) return null;

  return (
    <div className={cn('dropdown-container')}>
      <div className={cn('dropdown-header-mobile')}>
        <IconButton
          shape={'round'}
          onClick={() => setOpen(!open)}
          name="dropdown-button"
          height="medium"
          classNames={['button-blue']}
        >
          <Image
            src={getStaticSrc('icon', ICON_SRC_PATH.SRC.MENU)}
            alt="menu-icon"
            width={24}
            height={24}
          />
        </IconButton>
      </div>
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
            onClick={() => {}}
            className={cn('list-item', 'list-item-mobile')}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.WALLET)}
              alt="wallet"
              width={24}
              height={24}
              className={cn('icon')}
            />
            <BaseText
              text={getShortenAddress(address)}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
          <button
            onClick={() => router.push('/p/current')}
            className={cn('list-item', 'list-item-mobile', {
              able: isGame,
              disable: !isGame,
            })}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.PLAY)}
              alt="profile"
              width={24}
              height={24}
              className={cn('icon')}
            />
            <BaseText
              text={'Go to Play'}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
          <button
            onClick={() => router.push(`/d/${id}`)}
            className={cn('list-item', 'list-item-mobile', {
              able: isDashbaord,
              disable: !isDashbaord,
            })}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.DASHBOARD)}
              alt="dashboard"
              width={32}
              height={32}
              className={cn('icon')}
            />
            <BaseText
              text={'Dashboard'}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
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
              router.push('/leader-board');
            }}
            className={cn('list-item', {
              able: isLeaderboard,
              disable: !isLeaderboard,
            })}
          >
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.FLAG)}
              alt="flag"
              width={24}
              height={24}
              className={cn('icon')}
            />
            <BaseText
              text={'Leaderboard'}
              size={'medium'}
              weight={'regular'}
              color={'DARK'}
            />
          </button>
          <button
            onClick={() => {
              logout();
              router.replace('/');
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
