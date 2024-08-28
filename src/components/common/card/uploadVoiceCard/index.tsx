import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import styles from '@/components/common/card/uploadVoiceCard/UploadVoiceCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import GenerateVoiceInput from '@/components/common/input/generateVoiceInput';
import BaseButton from '@/widgets/button/baseButton';
import { COLOR } from '@/shared/constants/COLOR';

const cn = classNames.bind(styles);

type Props = {
  withBorder: boolean;
  withbackGround: boolean;
};

const UploadVoiceCard = ({ withBorder, withbackGround }: Props) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (value.length !== 0 && event.key === 'Enter') {
      }
    },
    [],
  );

  return (
    <div
      className={cn('card-container')}
      style={{
        border: withBorder ? `1px solid ${COLOR['DARK']}` : 'none',
        backgroundColor: withbackGround ? COLOR['LIGHT'] : 'transparent',
      }}
    >
      <BaseText
        text="You pooled in the biggest for the entire Onikuma!"
        color="DARK"
        size="large"
        weight="bold"
      />
      <div className={cn('text-container')}>
        <BaseText
          text="Celebrate your contribution with custom Onikuma AI powered voices."
          color="DARK_GRAY_2"
          size="medium"
          weight="regular"
        />
        <BaseText
          text="You can influence other players with your voice message!"
          color="DARK_GRAY_2"
          size="medium"
          weight="regular"
        />
      </div>
      <div className={cn('input-wrapper')}>
        <GenerateVoiceInput
          value={value}
          role="create-voice-input"
          label="create-voice-input"
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className={cn('button-wrapper')}>
        <BaseButton
          text="Confirm"
          shape="shape-4"
          role="button"
          label="voice-confirm-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
          theme="fill"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {}}
        />
        <BaseButton
          text="Skip this"
          shape="shape-4"
          role="button"
          label="voice-confirm-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
          theme="outline"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default UploadVoiceCard;
