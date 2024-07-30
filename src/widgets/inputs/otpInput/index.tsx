import React, { useState, useRef } from 'react';
import styles from '@/widgets/inputs/otpInput/OtpInput.module.scss';
import classNames from 'classnames/bind';
import { OTPInputProps } from '@/shared/types/ui/Input';

const cn = classNames.bind(styles);

const OTPInput = ({
  name,
  values,
  change,
  disabled = false,
  placeholder = '',
  helperText = '',
  error = false,
  shape = 'default',
  state = 'default',
  classNames = [],
  maxLength = 1,
}: OTPInputProps) => {
  const focusedIndexRef = useRef<number | null>(null);

  const handleChange = ( 
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    change(index, e.target.value);
    if (e.target.value.length >= maxLength && index < values.length - 1) {
      const nextInput = document.getElementById(`${name}-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleFocus = (index: number) => {
    focusedIndexRef.current = index;
  };

  const handleBlur = () => {
    focusedIndexRef.current = null;
  };

  return (
    <div className={cn('otp-input-container')}>
      {name && <label className={cn('otp-input-label')}>{name}</label>}
    <div
      className={cn(
        'otp-input-wrapper',
        state,
        ...classNames,
      )}
    >
      {values.map((value, index) => {
        const isFocused = focusedIndexRef.current === index;
        return (
        <input
          key={index}
          id={`${name}-${index}`}
          name={name}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur = {handleBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className={cn('otp-input', shape, isFocused && 'focused')}
        />
      )})}
    </div>
      <div className={cn('helper-text')}>{helperText}</div>
    </div>
  );
};

export default OTPInput;