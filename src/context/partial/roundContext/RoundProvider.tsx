'use client';
import { ReactNode, useCallback, useState } from 'react';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { Option, Topic } from '@/shared/types/data/topic';

type RoundList = {
  first: number[];
  second: number[];
  third: number[];
};

type Props = {
  children: ReactNode;
  topic: Topic;
  round: RoundList;
};

const RoundProvider = ({ children, topic, round }: Props) => {
  const [currentRound, setCurrentRound] = useState<8 | 4 | 2 | 1>(8);
  const [options, setOptions] = useState<Option[]>(topic.competitors);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number[]>(round.first);

  const next = useCallback(
    (optionName: string) => {
      const selected = options.find((option) => option.name === optionName);

      if (selected) {
        const newSelectedOptions = [...selectedOptions, selected];

        if (options.length === 2 && newSelectedOptions.length === 1) {
          setOptions(newSelectedOptions);
          setSelectedOptions([]);
          setCurrentRound(1);
        } else if (options.length === 4 && newSelectedOptions.length === 2) {
          setOptions(newSelectedOptions);
          setSelectedOptions([]);
          setCurrentRound(2);
          setCurrentIndex(round.third);
        } else if (options.length === 8 && newSelectedOptions.length === 4) {
          setOptions(newSelectedOptions);
          setSelectedOptions([]);
          setCurrentIndex(round.second);
          setCurrentRound(4);
        } else {
          setSelectedOptions(newSelectedOptions);
        }
      }
    },
    [options, selectedOptions, currentIndex, currentRound],
  );

  return (
    <RoundContext.Provider
      value={{
        next,
        selectedOptions,
        currentRound,
        setCurrentRound,
        options,
        setOptions,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </RoundContext.Provider>
  );
};

export { RoundProvider };
