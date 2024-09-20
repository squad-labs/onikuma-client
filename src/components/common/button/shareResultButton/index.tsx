import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { getPollResultImage } from '@/shared/api/Image';
import { getSharePoint } from '@/shared/api/Topics';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import { PollResult } from '@/shared/types/data/dashboard';
import { ImageShareType } from '@/shared/types/data/image';
import { LinkShare } from '@/shared/types/data/link';
import { getStaticSrc } from '@/shared/utils/etc';
import ShareButton from '@/widgets/button/shareButton';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

const ShareResultButton = ({
  topicId,
  totalGain,
  totalPnL,
  totalPoolIn,
  competitors,
}: PollResult) => {
  const dispatch = useDispatch();
  const cookie = getCookie('accessToken') ?? '';

  const getPoolResultShareImage = useMutation({
    mutationKey: [MUTATION_KEY.POST_POOL_RESULT, topicId],
    mutationFn: getPollResultImage,
    onSuccess: (data) => {
      handleCopyImage(data);
    },
  });

  const handleShareTwitter = useCallback(async () => {
    const tweetText = encodeURIComponent('Check this match out at Onikuma!\n');
    const tweetUrl = encodeURIComponent(window.location.href);
    const tweetHashTag = encodeURIComponent('Onikuma,Game,Berachain');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${tweetHashTag}&url=${tweetUrl}%0A`;
    await getSharePoint();
    window.open(twitterUrl, '_blank');
  }, []);

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
    [dispatch, topicId, competitors, totalGain, totalPnL, totalPoolIn],
  );

  const shareArray = useMemo(() => {
    return [
      {
        name: 'share-image',
        icon: 'COPY',
        type: 'image',
        handler: () =>
          getPoolResultShareImage.mutate({
            topicId,
            token: cookie,
            totalGain,
            totalPnL,
            totalPoolIn,
            competitors,
          }),
      },
      {
        name: 'share-x',
        icon: 'X',
        type: 'function',
        handler: () => handleShareTwitter(),
      },
    ] as LinkShare[];
  }, [dispatch, topicId, competitors, totalGain, totalPnL, totalPoolIn]);
  return (
    <ShareButton
      direction={'left'}
      startIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.SHARE)}
      closeIconImage={getStaticSrc('icon', ICON_SRC_PATH.SRC.CLOSE)}
      contents={shareArray}
    />
  );
};

export default ShareResultButton;
