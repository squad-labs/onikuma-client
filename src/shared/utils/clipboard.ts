export const Copy = async ({
  value,
  onSuccess,
  onError,
}: {
  value: string;
  onSuccess: () => void;
  onError: () => void;
}) => {
  try {
    await navigator.clipboard.writeText(value);
    onSuccess();
  } catch (error) {
    onError();
    return error;
  }
};

export const copyImage = async () => {};
