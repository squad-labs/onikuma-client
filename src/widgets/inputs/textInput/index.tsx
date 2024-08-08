import React, { useRef } from 'react';
import styles from '@/widgets/inputs/textInput/TextInput.module.scss';
import classNames from 'classnames/bind';
import { BaseInputProps } from '@/shared/types/ui/Input';

const cn = classNames.bind(styles);

const TextInput = ({
  name,
  shape = 'default',
  type = 'text',
  disabled = false,
  onChange,
  value = '',
  placeholder = '',
  state = 'default',
  classNames = [],
  children,
  helperText = '',
  error,
  showButtons = false,
  allowsNegative = true,
  ...rest
}: BaseInputProps) => {
  const inputRef = useRef(null);

  const handleIncrement = () => {
    if (!disabled && inputRef.current) {
      const currentValue = parseFloat(inputRef.current.value) || 0;
      const newValue = currentValue + 1;
      inputRef.current.value = newValue;
      onChange && onChange({ target: { name, value: newValue } });
    }
  };

  const handleDecrement = () => {
    if (!disabled && inputRef.current) {
      const currentValue = parseFloat(inputRef.current.value) || 0;
      const newValue = allowsNegative
        ? currentValue - 1
        : Math.max(currentValue - 1, 0);
      inputRef.current.value = newValue;
      onChange && onChange({ target: { name, value: newValue } });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className={cn('input-wrapper', shape, `${state}`, ...classNames)}>
      <label className={cn('label')}>{name}</label>
      <div className={cn('input-container')}>
        <input
          {...rest}
          ref={inputRef}
          name={name}
          type="text"
          disabled={disabled}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className={cn('text-input')}
        />
        {showButtons && (
          <div className={cn('custom-buttons')}>
            <button
              type="button"
              onClick={handleIncrement}
              className={cn('increment-button')}
            ></button>
            <button
              type="button"
              onClick={handleDecrement}
              className={cn('decrement-button')}
            ></button>
          </div>
        )}
        <div className={cn('icon')}>{children}</div>
      </div>
      <div className={cn('helper-text')}>{helperText}</div>
    </div>
  );
};

export default TextInput;
