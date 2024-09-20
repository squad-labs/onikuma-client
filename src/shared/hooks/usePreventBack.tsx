import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  active: boolean;
};

export const usePreventBack = ({ active }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (window.confirm('Are you sure you want to leave this page?')) {
        router.back();
        setIsActive(false);
      } else {
        router.push(pathname);
      }
    };

    if (active && isActive) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [active, isActive]);
};
