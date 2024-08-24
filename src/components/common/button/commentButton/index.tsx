import React, { Suspense } from 'react';
import styles from '@/components/common/button/commentButton/CommentButton.module.scss';
import classNames from 'classnames/bind';
import BaseButton from '@/widgets/button/baseButton';

const cn = classNames.bind(styles);

type Props = {
  onClick: () => void;
};

const CommentButton = ({ onClick }: Props) => {
  return (
    <div className={cn('button-wrapper')}>
      <Suspense>
        <BaseButton
          text="Post"
          shape={'shape-3'}
          label="post-button"
          role="submit"
          theme={'fill'}
          colors={{ primary: 'BASE_BLUE_1', secondary: 'BASE_CREAM_1' }}
          fontSize="medium"
          fontWeight="regular"
          onClick={onClick}
        />
      </Suspense>
    </div>
  );
};

export default CommentButton;
