import { NumberInputProps } from '@/shared/types/ui/Input';
import React, { useCallback, useMemo, Fragment } from 'react';
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
  placeholder = 'number',
}: NumberInputProps) => {
  const handleIncrease = useCallback(() => {
    if (value === '' || value === 0) {
      onClick(1);
    } else if (typeof value === 'number') {
      onClick(value + 1);
    }
  }, [value, onClick]);

  const isDecrementDisabled =
    (!allowsZero && value === 1) || (!allowsNegative && value === 0);

  const handleDecrease = useCallback(() => {
    if (!isDecrementDisabled && typeof value === 'number') {
      if (allowsNegative || value > 0) {
        if (!allowsZero && value - 1 === 0) {
          onClick('');
        } else {
          onClick(value - 1);
        }
      }
    }
  }, [value, onClick, allowsNegative, allowsZero, isDecrementDisabled]);

  const _isUpdateInput = useCallback((newValue: string) => {
    const numericValue = Number(newValue);

    if (newValue === '') {
      return true;
    } else {
      if (isNaN(numericValue)) return false;
      if (allowsNegative && numericValue > 0) {
        return true;
      }
      if (allowsZero && numericValue === 0) {
        return true;
      }
      if (numericValue >= 1) return true;
    }
    return false;
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (_isUpdateInput(event.target.value)) {
        onChange(event);
      }
    },
    [allowsNegative, allowsZero, onChange],
  );

  const displayValue = useMemo(() => {
    return value === '' ? '' : value;
  }, [value]);

  if (!allowsZero && value === 0) {
    return;
  }

  if (!allowsNegative && typeof value === 'number' && value < 0) {
    return;
  }

  return (
    <div className={cn('input-wrapper', shape, `${state}`, ...classNames)}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input-container')}>
        <input
          type={'text'}
          value={displayValue}
          onChange={handleInputChange}
          className={cn('text-input')}
          placeholder={displayValue === '' ? placeholder : ''}
        />
        <div className={cn('custom-buttons')}>
          {showIncDecButton && (
            <Fragment>
              <button
                onClick={handleIncrease}
                className={cn('increment-button')}
              />
              <button
                disabled={isDecrementDisabled}
                onClick={handleDecrease}
                className={cn('decrement-button')}
              />
            </Fragment>
          )}
        </div>
      </div>
      <div className={cn('helper-text')}>{helperText}</div>
    </div>
  );
};

export default NumberInput;
