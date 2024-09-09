'use client';
import { OPEN_MODAL } from '@/context/global/slice/modalSlice';
import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { RoundContext } from '@/context/partial/roundContext/RoundContext';
import { getResultImage, getShareImage } from '@/shared/api/Image';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { useRound } from '@/shared/hooks/useRound';
import { ImageShareType } from '@/shared/types/data/image';
import { LinkShare } from '@/shared/types/data/link';
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
  startAt: string;
  buttonDirection: 'left' | 'down';
};

const ShareGameButton = ({
  topicId,
  title,
  status,
  startAt,
  buttonDirection,
}: Props) => {
  const dispatch = useDispatch();
  const cookie = getCookie('accessToken') ?? '';
  const { options, currentIndex } = useContext(RoundContext);
  const { roundIndex } = useRound(RoundContext);

  const getTopicShareImageMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'topic'],
    mutationFn: getShareImage,
    onSuccess: async (data: ImageShareType) => {
      const image = data.imageUrl;
      handleCopyImage(image);
    },
  });

  const handleCopyImage = useCallback(
    async (url: string) => {
      console.log('url', url);
      await fetch(url)
        .then((res) => {
          console.log('res', res);
          return res.blob();
        })
        .then((blob) => {
          console.log(blob);
          const item = [
            new ClipboardItem({
              'image/png': blob,
            }),
          ];
          console.log('item', item);
          navigator.clipboard
            .write(item)
            .then(() => {
              dispatch(
                SET_TOAST({
                  type: 'link',
                  canClose: true,
                  autoClose: {
                    duration: 3000,
                  },
                }),
              );
            })
            .catch(() => {
              dispatch(
                SET_TOAST({
                  type: 'info',
                  canClose: true,
                  autoClose: {
                    duration: 3000,
                  },
                }),
              );
            });
        });
    },
    [dispatch, buttonDirection, options, currentIndex, roundIndex],
  );

  const getResultShareImageMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_IMAGE, 'result'],
    mutationFn: getResultImage,
    onSuccess: async (data) => {
      const image = data.imageUrl;

      console.log('data', data);
      handleCopyImage(image);
    },
  });

  const imageHandler = useCallback(() => {
    if (buttonDirection === 'left') {
      getTopicShareImageMutation.mutate({
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
      });
    } else {
      getResultShareImageMutation.mutate({
        topicId,
        title,
        roundText: status,
        dateText: startAt,
        token: cookie,
        option: {
          name: options[0].name,
          imageUrl: options[0].imgUrl,
        },
      });
    }
  }, [dispatch, options, buttonDirection]);

  const modalHandler = useCallback(() => {
    if (buttonDirection === 'left') {
      dispatch(
        OPEN_MODAL({
          name: 'ShareTopicModal',
          data: {
            topicId: topicId,
            title: title,
            roundText: status,
            dateText: startAt,
            options: [
              {
                name: options[currentIndex[roundIndex]].name,
                imageUrl: options[currentIndex[roundIndex]].imgUrl,
              },
              {
                name: options[currentIndex[options.length - 1 - roundIndex]]
                  .name,
                imageUrl:
                  options[currentIndex[options.length - 1 - roundIndex]].imgUrl,
              },
            ],
          },
        }),
      );
    } else {
      dispatch(
        OPEN_MODAL({
          name: 'ShareResultModal',
          data: {
            topicId: topicId,
            title: title,
            roundText: status,
            dateText: startAt,
            option: {
              name: options[0].name,
              imageUrl: options[0].imgUrl,
            },
          },
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
        handler: () => {
          const tweetText = encodeURIComponent(
            'Check this match out at Onikuma!',
          );
          const tweetUrl = encodeURIComponent(window.location.href);
          const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
          window.open(twitterUrl, '_blank');
        },
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
