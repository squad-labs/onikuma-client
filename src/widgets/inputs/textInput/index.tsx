import React, { Fragment } from 'react';
import styles from '@/widgets/inputs/textInput/TextInput.module.scss';
import classNames from 'classnames/bind';
import { InputProps } from '@/shared/types/ui/Input';

const cn = classNames.bind(styles);

const TextInput = ({
    name, 
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
}: InputProps) => {
    return (
      <div className={cn('input-wrapper', shape, `${state}`,...classNames)}>
        <label className={cn('label')}>{name}</label>
        <div className={cn('input-container')}>
          <input
            {...rest}
            name={name}
            type={type}
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
}

export default TextInput;