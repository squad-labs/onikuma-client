import { IRoundContext } from '@/context/partial/roundContext/RoundContext';
import { Context, useContext, useMemo } from 'react';

export const useRound = (context: Context<IRoundContext>) => {
  const { currentRound, selectedOptions, options, currentIndex } =
    useContext(context);

  const roundIndex = useMemo(() => {
    if (currentRound === 1) {
      return 0;
    } else if (currentRound === 2) {
      return 1;
    } else {
      return selectedOptions.length;
    }
  }, [currentRound, selectedOptions, options, currentIndex]);

  const roundStatus = useMemo(() => {
    if (currentRound === 8) {
      return `quarter-final ${selectedOptions.length + 1}/4`;
    } else if (currentRound === 4) {
      return `semi-final ${selectedOptions.length + 1}/2`;
    } else if (currentRound === 2) {
      return `final 1/1`;
    } else if (currentRound === 1) {
      return 'finalist';
    } else return '';
  }, [currentRound, selectedOptions, options, currentIndex]);

  const isFinal = useMemo(() => {
    return currentRound === 1;
  }, [currentRound]);

  return {
    roundIndex,
    roundStatus,
    isFinal,
  };
};
