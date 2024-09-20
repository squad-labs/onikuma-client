'use client';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { getResultImage, getShareImage } from '@/shared/api/Image';
import { getSharePoint } from '@/shared/api/Topics';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import { useRound } from '@/shared/hooks/useRound';
import { ImageShareType } from '@/shared/types/data/image';
import { LinkShare } from '@/shared/types/data/link';
import {
  ShareResultModalProps,
  ShareTopicModalProps,
} from '@/shared/types/ui/Modal';
import { Copy } from '@/shared/utils/clipboard';
import { getStaticSrc } from '@/shared/utils/etc';
import ShareButton from '@/widgets/button/shareButton';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  topicId: string;
  title: string;
  status: string;
  name: string;
  startAt: string;
  imageUrl: string;
  buttonDirection: 'left' | 'down';
};

const ShareGameButton = ({
  topicId,
  title,
  status,
  startAt,
  name,
  imageUrl,
  buttonDirection,
}: Props) => {
  const dispatch = useDispatch();
  const cookie = getCookie('accessToken') ?? '';
  const { options, currentIndex } = useContext(RoundContext);
  const { roundIndex } = useRound(RoundContext);

  const topicParams = useMemo(() => {
    return (
      buttonDirection === 'left' && {
        topicId,
        title,
        roundText: status,
        dateText: startAt,
        token: cookie,
        options: [
          {
            name: options[currentIndex[roundIndex]].name,
            imageUrl: options[currentIndex[roundIndex]].imgUrl,
          },
          {
            name: options[currentIndex[options.length - 1 - roundIndex]].name,
            imageUrl:
              options[currentIndex[options.length - 1 - roundIndex]].imgUrl,
          },
        ],
      }
    );
  }, [
    dispatch,
    options,
    buttonDirection,
    roundIndex,
    startAt,
    status,
    currentIndex,
  ]);

  const resultParams = useMemo(() => {
    return (
      buttonDirection === 'down' && {
        topicId,
        title,
        roundText: status,
        dateText: startAt,
        token: cookie,
        option: {
          name: name,
          imageUrl: imageUrl,
        },
      }
    );
  }, [
    dispatch,
    options,
    buttonDirection,
    roundIndex,
    startAt,
    status,
    currentIndex,
  ]);

  const getTopicShareImageMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'topic'],
    mutationFn: getShareImage,
    onSuccess: async (data) => {
      handleCopyImage(data);
    },
  });

  const getResultShareImageMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'result'],
    mutationFn: getResultImage,
    onSuccess: async (data) => {
      handleCopyImage(data);
    },
  });

  const getTopicShareTwitter = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'twitter'],
    mutationFn: getShareImage,
    onSuccess: async (data: ImageShareType) => {
      const tweetText = encodeURIComponent(
        'Check this match out at Onikuma!\n',
      );
      const tweetUrl = encodeURIComponent(window.location.href);
      const tweetHashTag = encodeURIComponent('Onikuma,Game,Berachain');
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${tweetHashTag}&url=${tweetUrl}%0A`;
      window.open(twitterUrl, '_blank');
    },
  });

  const getResultShareTwitter = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'twitter'],
    mutationFn: getResultImage,
    onSuccess: async (data: ImageShareType) => {
      const tweetText = encodeURIComponent(
        'Check this match out at Onikuma!\n',
      );
      const tweetUrl = encodeURIComponent(window.location.href);
      const tweetHashTag = encodeURIComponent('Onikuma,Game,Berachain');
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${tweetHashTag}&url=${tweetUrl}%0A`;
      await getSharePoint();
      window.open(twitterUrl, '_blank');
    },
  });

  const handleCopyImage = useCallback(
    async (data: ImageShareType) => {
      const blob = await fetch(data.imageUrl, {
        headers: {
          'Content-Type': 'image/png',
        },
      }).then((res) => res.blob());
      await getSharePoint();

      const item = [
        new ClipboardItem({
          'image/png': blob,
        }),
      ];

      await navigator.clipboard
        .write(item)
        .then(() => {
          dispatch(
            SET_TOAST({
              type: 'success',
              text: TOAST_RESPONSE.COPY_IMAGE.SUCCESS,
              autoClose: {
                duration: 3000,
              },
            }),
          );
        })
        .catch(() => {
          dispatch(
            SET_TOAST({
              type: 'error',
              text: TOAST_RESPONSE.COPY_IMAGE.ERROR,
              canClose: true,
              autoClose: {
                duration: 3000,
              },
            }),
          );
        });
    },
    [dispatch, buttonDirection, options, currentIndex, roundIndex],
  );

  const handleShareTwitter = useCallback(async () => {
    if (buttonDirection === 'left') {
      getTopicShareTwitter.mutate(
        topicParams as ShareTopicModalProps & { token: string },
      );
    } else {
      getResultShareTwitter.mutate(
        resultParams as ShareResultModalProps & { token: string },
      );
    }
    await getSharePoint();
  }, [
    dispatch,
    options,
    buttonDirection,
    roundIndex,
    startAt,
    status,
    currentIndex,
  ]);

  const imageHandler = useCallback(() => {
    if (buttonDirection === 'left') {
      getTopicShareImageMutation.mutate(
        topicParams as ShareTopicModalProps & { token: string },
      );
    } else {
      getResultShareImageMutation.mutate(
        resultParams as ShareResultModalProps & { token: string },
      );
    }
  }, [
    dispatch,
    options,
    buttonDirection,
    roundIndex,
    startAt,
    status,
    currentIndex,
  ]);

  const modalHandler = useCallback(() => {
    if (buttonDirection === 'left') {
      dispatch(
        OPEN_MODAL({
          name: 'ShareTopicModal',
          data: topicParams,
        }),
      );
    } else {
      Copy({
        value: window.location.href,
        onSuccess: () => {
          dispatch(
            SET_TOAST({
              type: 'success',
              text: TOAST_RESPONSE.COPY_LINK.SUCCESS,
              canClose: true,
              autoClose: {
                duration: 3000,
              },
            }),
          );
        },
        onError: () => {},
      });

      dispatch(
        OPEN_MODAL({
          name: 'ShareResultModal',
          data: resultParams,
        }),
      );
    }
  }, [dispatch, options, buttonDirection]);

  const shareArray = useMemo(() => {
    return [
      {
        name: 'share-image',
        icon: 'COPY',
        type: 'image',
        handler: () => imageHandler(),
      },
      {
        name: 'share-link',
        icon: 'LINK',
        type: 'link',
        handler: () => modalHandler(),
      },
      {
        name: 'share-x',
        icon: 'X',
        type: 'function',
        handler: () => handleShareTwitter(),
      },
    ] as LinkShare[];
  }, [options, currentIndex, roundIndex, dispatch]);

  return (
    <ShareButton
      direction={buttonDirection}
      startIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.SHARE)}
      closeIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.CLOSE)}
      contents={shareArray}
    />
  );
};

export default ShareGameButton;
