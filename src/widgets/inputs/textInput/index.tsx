import React, { Fragment } from 'react';
import styles from '@/widgets/inputs/textInput/TextInput.module.scss';
import classNames from 'classnames/bind';
import {InputProps} from '@/shared/types/ui/Input';

const cn = classNames.bind(styles);

const TextInput = ({
    name, 
    shape, 
    type = 'input',
    fontSize = 'medium',
    fontWeight = 'regular',
    disabled = false,
    onChange,
    value = '',
    placeholder = '',
    color = 'default',
    classNames = [],
    ...rest
}: InputProps) => {
    return (
      <div className={cn('input-wrapper', ...classNames)}>
        <label className={cn('label')}>{name}</label>
        <div className={cn('input-container', shape, color)}>
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
          <span className={cn('icon')}></span>
          {}
        </div>
      </div>
    );
}

export default TextInput;