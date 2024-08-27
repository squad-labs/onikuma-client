import React, { useState } from 'react';
import styles from '@/widgets/dropdown/baseDropdown/BaseDropdown.module.scss';
import classNames from 'classnames/bind';
import { BaseDropdownProps } from '@/shared/types/ui/Dropdown';

const cn = classNames.bind(styles);

const BaseDropdown = ({
  label,
  options,
  onSelect,
  urls = [],
  labelIcon = '',
  optionIcons = [],
  buttonImage = '',
}: BaseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string, url?: string) => {
    onSelect(option);
    setIsOpen(false);
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className={cn(`dropdown-container`)}>
      <div className={cn('dropdown-label')}>
        {labelIcon && (<img src={labelIcon} className={cn('label-icon')}></img>)}
        {label}
      </div>
      <button
        className={cn(`dropdown-button`)}
        onClick={toggleDropdown}
      >
        <img src={buttonImage} alt="" className={cn('button-image')}/>
      </button>
      {isOpen && (
        <div className={cn('dropdown-content')}>
          {options.map((option, index) => (
            <a
              href={urls[index] || '#!'}
              key={index}
              onClick={(e) => handleSelect(option, urls[index])}
            >
              <div className={cn('option-container')}>
                {optionIcons[index] && (
                <img src={optionIcons[index]} alt={option} className="option-icon" />
                )}
                {option}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseDropdown; 
