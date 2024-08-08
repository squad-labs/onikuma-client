import { NumberInputProps } from '@/shared/types/ui/Input';
import React, { useCallback, useMemo, useEffect } from 'react';
import styles from '@/widgets/inputs/numberInput/NumberInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const NumberInput = ({
  value,
  onChange,
  onClick,
  allowsNegative = false,
  allowsZero = false,
  showIncDecButton = true,
  shape = 'default',
  state = 'default',
  classNames = [],
  helperText = '',
  label = '',
}: NumberInputProps) => {
  const handleIncrease = useCallback(() => {
    if (typeof value === 'number') {
      onClick(value + 1);
    }
  }, [value, onClick]);

  const handleDecrease = useCallback(() => {
    if (typeof value === 'number') {
      if (allowsNegative || value > 0) {
        if (!allowsZero && value - 1 === 0) {
          onClick('');
        } else {
          onClick(value - 1);
        }
      }
    }
  }, [value, onClick, allowsNegative, allowsZero]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const numericValue = Number(newValue);

      if (
        newValue === '' ||
        (!allowsNegative && numericValue >= 0) ||
        (allowsNegative && !isNaN(numericValue)) ||
        (allowsZero && numericValue === 0)
      ) {
        onChange(event);
      }
    },
    [allowsNegative, onChange],
  );

  return (
    <div className={cn('input-wrapper', shape, `${state}`, ...classNames)}>
        <label className={cn('label')}>{label}</label>
      <div className={cn('input-container')}>
        <input type={'text'} value={value} onChange={handleInputChange} className={cn('text-input')} />
        <div className={cn('custom-buttons')}>
          {showIncDecButton && (
            <>
              <button
                onClick={handleIncrease}
                className={cn('increment-button')}
              ></button>
              <button
                onClick={handleDecrease}
                className={cn('decrement-button')}
              ></button>
            </>
          )}
        </div>
      </div>
      <div className={cn('helper-text')}>{helperText}</div>
    </div>
  );
};
export default NumberInput;
