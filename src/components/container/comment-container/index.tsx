import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '@/components/container/comment-container/CommentContainer.module.scss';
import classNames from 'classnames/bind';
import CommentInput from '@/widgets/inputs/commentInput';
import { CommentContext } from '@/context/partial/commentContext/CommentContext';
import CommentCard from '@/widgets/card/commentCard';
import BaseText from '@/widgets/text/baseText';
import { Comment } from '@/shared/types/data/comment';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { getAllComments, postCommnets } from '@/shared/api/Comments';
import CommentButton from '@/components/common/button/commentButton';
import { fetchDateFormat, fetchTimeFormat } from '@/shared/utils/date';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
};

const CommentContainer = ({ topicId }: Props) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await getAllComments({
      topicId,
      page: pagination,
      pageSize: 20,
    });
    setCommentList([...commentList, ...response]);
    setIsLoading(false);
  }, [pagination]);

  const { comment, setComment, socket } = useContext(CommentContext);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    },
    [],
  );

  const postCommentMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_COMMENTS],
    mutationFn: postCommnets,
    onSuccess: () => {
      setComment('');
    },
  });

  const handleSubmit = () => {
    if (comment.length !== 0) {
      postCommentMutation.mutate({
        topicId,
        contents: comment,
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (comment.length !== 0 && event.key === 'Enter') {
      postCommentMutation.mutate({
        topicId,
        contents: comment,
      });
    }
  };

  useEffect(() => {
    socket?.on('comment', (data: Comment) => {
      setCommentList(() => [data, ...commentList]);
    });
  }, [socket, comment, commentList]);

  const onIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading && commentList.length !== 0) {
      setPagination((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      root: document.querySelector('#container'),
      threshold: 0,
    });

    const observerTarget = document.querySelector('#observer-block');
    if (observerTarget) observer.observe(observerTarget);

    return () => {
      observer.disconnect();
    };
  }, [commentList]);

  useEffect(() => {
    fetchData();
  }, [pagination]);

  return (
    <div className={cn('container')}>
      <BaseText text="Comments" color={'DARK'} size={'large'} weight="bold" />
      <div className={cn('input-container')}>
        <CommentInput
          value={comment}
          onChange={(event) => handleOnChange(event)}
          onKeyUp={(event) => handleKeyDown(event)}
          role="comment-input"
          label="comment-input"
        />
        <CommentButton onClick={handleSubmit} />
      </div>
      <div id="container" className={cn('comment-list')}>
        {commentList?.map((el: Comment, index: number) => {
          const isFirst = index === 0;
          const formatedDate = `${fetchDateFormat(el.createdAt)} ${fetchTimeFormat(el.createdAt)}`;
          return (
            <CommentCard
              key={el.commentId}
              commentId={el.commentId}
              address={el.userWallet}
              text={el.contents}
              likeCount={el.likes}
              createdAt={formatedDate}
              isFirst={isFirst}
              liked={el.isLiked}
            />
          );
        })}
        <div className={cn('last-comment-wrapper')} id="observer-block"></div>
      </div>
    </div>
  );
};

export default CommentContainer;
