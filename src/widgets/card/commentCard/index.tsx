import React, { useCallback, useState } from 'react';
import styles from '@/widgets/card/commentCard/CommentCard.module.scss';
import classNames from 'classnames/bind';
import { CommentCardProps } from '@/shared/types/ui/Card';
import LikeOutlineIcon from '@/assets/icons/like-outline.svg';
import LikeFillIcon from '@/assets/icons/like-fill.svg';
import { fetchRelatedTime } from '@/shared/utils/date';
import { getCommentLikes } from '@/shared/api/Comments';
import { getShortenAddress } from '@/shared/utils/format';

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
            <LikeFillIcon viewBox="0 0 19 16" className={cn('icon')} />
          ) : (
            <LikeOutlineIcon viewBox="0 0 19 16" className={cn('icon')} />
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
