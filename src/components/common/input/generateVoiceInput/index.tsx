import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from '@/components/common/input/generateVoiceInput/GenerateVoiceInput.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import BaseButton from '@/widgets/button/baseButton';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { postTopicVoice } from '@/shared/api/Activity';
import { useDispatch } from 'react-redux';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import { SET_TOAST } from '@/context/global/slice/toastSlice';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  role: string;
  label: string;
  audioUrl: string;
  setAudioUrl: Dispatch<SetStateAction<string>>;
};

const GenerateVoiceInput = ({
  topicId,
  value,
  onChange,
  onKeyUp,
  disabled,
  error,
  role,
  label,
  audioUrl,
  setAudioUrl,
}: Props) => {
  const dispatch = useDispatch();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const postVoiceMutation = useMutation({
    mutationKey: [MUTATION_KEY.POST_VOICE],
    mutationFn: postTopicVoice,
    onSuccess: (data) => {
      setAudioUrl(data.biggestTopicVoiceUrl);
      dispatch(
        SET_TOAST({
          type: 'success',
          text: TOAST_RESPONSE.GENERATE_VOICE.SUCCESS,
          canClose: true,
          autoClose: {
            duration: 3000,
          },
        }),
      );
    },
  });

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    newAudio.src = audioUrl;
    newAudio.controls = true;
    newAudio.loop = false;
    setAudio(newAudio);
  }, [audioUrl]);

  const isDisable = useMemo(
    () => value.length < 5 || value.length > 200,
    [value],
  );

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
            disabled={isDisable}
            text="Generate"
            shape="shape-3"
            role="button"
            label="generate-voice-button"
            colors={{ primary: 'DARK_GRAY_1', secondary: 'LIGHT' }}
            theme="outline"
            fontSize="medium"
            fontWeight="regular"
            onClick={() => {
              if (!isDisable) {
                postVoiceMutation.mutate({
                  topicId: topicId,
                  text: value,
                });
              }
            }}
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
            onClick={() => {
              if (audio) {
                audio.play();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateVoiceInput;
