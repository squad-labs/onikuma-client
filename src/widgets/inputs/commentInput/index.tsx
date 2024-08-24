import React from 'react';
import styles from '@/widgets/inputs/commentInput/CommentInput.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';

const cn = classNames.bind(styles);

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  role: string;
  label: string;
};

const CommentInput = ({
  value,
  onChange,
  onKeyUp,
  disabled,
  error,
  role,
  label,
}: Props) => {
  return (
    <div className={cn('input-container')}>
      <BaseText
        text={'Add a comment...'}
        color={'DARK'}
        size={'medium'}
        weight={'regular'}
      />
      <textarea
        placeholder="Text..."
        aria-label={label}
        role={role}
        value={value}
        onChange={(event) => onChange(event)}
        onKeyUp={(event) => onKeyUp(event)}
        disabled={disabled}
        className={cn('input', { error })}
      />
    </div>
  );
};

export default CommentInput;
