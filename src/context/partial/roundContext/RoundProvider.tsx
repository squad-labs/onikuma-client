'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { Option, Topic } from '@/shared/types/data/topic';
import { mintclub, wei } from 'watchman-tool-sdk';
import { getTopicTokenPrice } from '@/shared/api/Activity';
import { TokenPriceType } from '@/shared/types/data/token';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import { ethers } from 'ethers';
import { Config, useClient } from 'wagmi';
import { chain as AppChain } from '@/config/web3Config';

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
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [ticker, setTicker] = useState<string>(topic.ticker);
  const [currentRound, setCurrentRound] = useState<8 | 4 | 2 | 1>(8);
  const [options, setOptions] = useState<Option[]>(topic.competitors);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number[]>(round.first);
  const network = mintclub.network('berachaintestnetbartio');
  const token = network.token(topic.ticker);
  const client = useClient<Config>({ chainId: AppChain.id });

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

  const waitTransaction = useCallback(async (txHash: string) => {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_BERACHAIN_RPC_URL,
    );

    try {
      const receipt = await provider.waitForTransaction(txHash);

      if (receipt?.status === 1) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
    return false;
  }, []);

  const getToken = useCallback(async (amount: string) => {
    try {
      const token: TokenPriceType = await getTopicTokenPrice({
        topicId: topic._id,
        amount,
      });

      return {
        price: parseFloat(token.estimation),
        royalty: parseFloat(token.royalty),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          price: 0,
          royalty: 0,
        };
      }
      return {
        price: 0,
        royalty: 0,
      };
    }
  }, []);

  const mintToken = useCallback(
    async (callback: () => void) => {
      setIsSending(true);

      await mintclub.wallet.connect(window.okxwallet);
      try {
        await token.buy({
          amount: wei(1, 18),
          async onSigned(tx) {
            const result = await waitTransaction(tx);
            if (result) {
              dispatch(
                SET_TOAST({
                  type: 'success',
                  canClose: true,
                  text: TOAST_RESPONSE.SEND_TRANSACTION.SUCCESS,
                  autoClose: {
                    duration: 3000,
                  },
                }),
              );
              callback();
            } else {
              dispatch(
                SET_TOAST({
                  type: 'error',
                  text: TOAST_RESPONSE.SEND_TRANSACTION.ERROR,
                  canClose: true,
                  autoClose: {
                    duration: 3000,
                  },
                }),
              );
            }
          },
        });
      } catch (error) {
        dispatch(
          SET_TOAST({
            type: 'error',
            text: TOAST_RESPONSE.SEND_TRANSACTION.ERROR,
            canClose: true,
            autoClose: {
              duration: 3000,
            },
          }),
        );
        if (axios.isAxiosError(error)) {
          return;
        }
      }
      setIsSending(false);
    },
    [network, ticker, token],
  );

  return (
    <RoundContext.Provider
      value={{
        next,
        isSending,
        ticker,
        setTicker,
        getToken,
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
