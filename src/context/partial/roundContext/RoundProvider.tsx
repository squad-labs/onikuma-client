'use client';
import { ReactNode, useCallback, useState } from 'react';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { Option, Topic } from '@/shared/types/data/topic';
import { mintclub, wei } from 'watchman-tool-sdk'
import { getTopicTokenPrice } from '@/shared/api/Activity';
import { TokenPriceType } from '@/shared/types/data/token';

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
  const [ticker, setTicker] = useState<string>(topic.ticker);
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

  const getTokenPrice = useCallback(async(amount: string) => {
    try {
      const token: TokenPriceType = await getTopicTokenPrice({ topicId: topic._id, amount })

      return token.estimation;
    } catch (error) {
      console.log(error)
    }
    return 0
  }, [])

  const mintToken = async(symbol: string, callback: () => void) => {
    const account = await mintclub.wallet.connect()
    const network = await mintclub.network('berachaintestnetbartio')
    try {
      const token = await network.token(symbol)
      console.log('token', token)
      await token.buy({
        amount: wei(1, 18),
        onSuccess: (data) => {
          console.log('data', data)
          callback()
        },
        onError: (error) => {
          console.log('error', error)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RoundContext.Provider
      value={{
        next,
        ticker,
        setTicker,
        getTokenPrice,
        mintToken,
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
