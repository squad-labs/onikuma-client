import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import styles from '@/components/common/card/uploadVoiceCard/UploadVoiceCard.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import GenerateVoiceInput from '@/components/common/input/generateVoiceInput';
import BaseButton from '@/widgets/button/baseButton';
import { COLOR } from '@/shared/constants/COLOR';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/shared/constants/MUTATION_KEY';
import { confirmTopicVoice } from '@/shared/api/Activity';
import { useDispatch } from 'react-redux';
import { SET_TOAST } from '@/context/global/slice/toastSlice';
import { TOAST_RESPONSE } from '@/shared/constants/TOAST_SRC';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type Props = {
  topicId: string;
  withBorder: boolean;
  withbackGround: boolean;
  setSkip: () => void;
  audioUrl: string;
  setAudioUrl: Dispatch<SetStateAction<string>>;
};

const UploadVoiceCard = ({
  topicId,
  withBorder,
  withbackGround,
  setSkip,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  const handleKeyUp = useCallback(() => {}, []);

  const confirmVoiceMutation = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: confirmTopicVoice,
    onSuccess: (data) => {
      console.log(data);
      dispatch(
        SET_TOAST({
          type: 'success',
          text: TOAST_RESPONSE.UPLOAD_VOICE.SUCCESS,
          autoClose: {
            duration: 3000,
          },
        }),
      );
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_VOICE] });
      router.push('/p/current');
    },
  });

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
          topicId={topicId}
          value={value}
          role="create-voice-input"
          label="create-voice-input"
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
        />
      </div>
      <div className={cn('button-wrapper')}>
        <BaseButton
          disabled={audioUrl.length === 0}
          text="Confirm"
          shape="shape-4"
          role="button"
          label="voice-confirm-button"
          colors={{ primary: 'BASE_BLUE_1', secondary: 'LIGHT' }}
          theme="fill"
          fontSize="large"
          fontWeight="regular"
          onClick={() => {
            if (audioUrl.length !== 0) {
              confirmVoiceMutation.mutate({
                topicId: topicId,
                biggestTopicVoiceUrl: audioUrl,
              });
            }
          }}
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
          onClick={() => setSkip()}
        />
      </div>
    </div>
  );
};

export default UploadVoiceCard;
