import { useEffect } from 'react';

type Props = {
  active: boolean;
};

export const usePreventRefresh = ({ active }: Props) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    if (active) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [active]);
};
