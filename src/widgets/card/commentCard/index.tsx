import React, { useCallback, useState } from 'react';
import styles from '@/widgets/card/commentCard/CommentCard.module.scss';
import classNames from 'classnames/bind';
import { CommentCardProps } from '@/shared/types/ui/Card';
import { fetchRelatedTime } from '@/shared/utils/date';
import { getCommentLikes } from '@/shared/api/Comments';
import { getShortenAddress } from '@/shared/utils/format';
import Image from 'next/image';
import { getStaticSrc } from '@/shared/utils/etc';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

const cn = classNames.bind(styles);

const CommentCard = ({
  text,
  commentId,
  address,
  likeCount,
  createdAt,
  isFirst,
  liked,
}: CommentCardProps) => {
  const [likes, setLikes] = useState<number>(likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const fetchLike = useCallback(async () => {
    const response = await getCommentLikes({ commentId });
    if (response) {
      setIsLiked(response.isLiked);
      setLikes(response.likes);
    }
  }, [isLiked, likes]);

  return (
    <div className={cn('card-container', isFirst && 'card-top')}>
      <span className={cn('address')}>{getShortenAddress(address)}</span>
      <p className={cn('text')}>{text}</p>
      <div className={cn('meta-container')}>
        <button className={cn('like-button')} onClick={fetchLike}>
          {isLiked ? (
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.LIKE_FILL)}
              alt="like-fill"
              width={19}
              height={16}
              priority
              className={cn('icon')}
            />
          ) : (
            <Image
              src={getStaticSrc('icon', ICON_SRC_PATH.SRC.LIKE_OUTLINE)}
              alt="like-outline"
              width={19}
              height={16}
              priority
              className={cn('icon')}
            />
          )}
        </button>
        <span className={cn('like')}>{likes}</span>
        <span className={cn('dot')}>·</span>
        <span className={cn('duration')}>{fetchRelatedTime(createdAt)}</span>
      </div>
    </div>
  );
};

export default CommentCard;
