import React from 'react';
import styles from '@/widgets/inputs/base/BaseInput.module.scss';
import classNames from 'classnames/bind';
import { BaseInputProps } from '@/shared/types/ui/Input';

const cn = classNames.bind(styles);

const BaseInput = ({
  label,
  shape = 'default',
  type = 'input',
  disabled = false,
  onChange,
  value = '',
  placeholder = '',
  state = 'default',
  classNames = [],
  children,
  helperText = '',
  ...rest
}: BaseInputProps) => {
  return (
    <div className={cn('input-wrapper', shape, `${state}`, ...classNames)}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input-container')}>
        <input
          {...rest}
          name={label}
          type={type === 'number' ? 'number' : 'text'}
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={cn('text-input')}
        />
        <div className={cn('icon')}>{children}</div>
      </div>
      <div className={cn('helper-text')}>{helperText}</div>
    </div>
  );
};

export default BaseInput;
