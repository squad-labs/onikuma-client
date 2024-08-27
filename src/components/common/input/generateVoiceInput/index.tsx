import React from 'react';
import styles from '@/components/common/input/generateVoiceInput/GenerateVoiceInput.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import BaseButton from '@/widgets/button/baseButton';

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

const GenerateVoiceInput = ({
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
        text="AI powered Onikuma voice"
        color="DARK"
        size="large"
        weight="bold"
      />
      <div className={cn('textarea-container')}>
        <textarea
          name={label}
          placeholder="Text..."
          rows={10}
          aria-label={label}
          role={role}
          value={value}
          onChange={(event) => onChange(event)}
          onKeyUp={(event) => onKeyUp(event)}
          disabled={disabled}
          className={cn('textarea', { error })}
        />
        <div className={cn('button-wrapper')}>
          <BaseButton
            text="Generate"
            shape="shape-3"
            role="button"
            label="generate-voice-button"
            colors={{ primary: 'DARK_GRAY_1', secondary: 'LIGHT' }}
            theme="outline"
            fontSize="medium"
            fontWeight="regular"
            onClick={() => {}}
          />
          <BaseButton
            text="Play"
            shape="shape-3"
            role="button"
            label="generate-voice-button"
            colors={{ primary: 'DARK_GRAY_1', secondary: 'LIGHT' }}
            theme="fill"
            fontSize="medium"
            fontWeight="regular"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateVoiceInput;
