import React, { useState } from 'react';
import styles from '@/widgets/button/clickButton/ClickButton.module.scss';
import classNames from 'classnames/bind';
import { ClickButtonProps } from '@/shared/types/ui/Button';

const cn = classNames.bind(styles);

const ClickButton = ({
  name,
  disabled,
  shape,
  children = undefined,
  classNames = [],
  ...rest
}: ClickButtonProps) => {
  const [hasShadow, setHasShadow] = useState(true);

  const handleClick = () => {
    setHasShadow(!hasShadow);
  };

  return (
    <button
      className={cn(
        styles.clickButton,
        hasShadow ? '' : styles.shadow,
        shape === 'round' ? styles.round : styles.square,
        ...classNames,
      )}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ClickButton;
